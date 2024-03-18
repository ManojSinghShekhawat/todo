if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
}

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
var methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const app = express();
const PORT = 3000;
const User = require("./models/users.js");
const taskRouter = require("./routes/tasks.js");
const usersRouter = require("./routes/users.js");
const flash = require("connect-flash");

const dbUrl = process.env.MONGO_URL;

const store = MongoStore.create({
	mongoUrl: dbUrl,
	crypto: {
		secret: process.env.SECRET,
	},
	touchAfter: 24 * 3600,
});

store.on("error", () => {
	console.log("ERROR IN MONGO SESSION STOR", err);
});

const sessionOptions = {
	store,
	secret: process.env.SECRET,
	saveUninitialized: true,
	resave: false,
	cookie: {
		expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: true,
	},
};

try {
	mongoose.connect(dbUrl).then(() => console.log("Connected!"));
} catch (error) {
	console.log(error);
}

app.use(flash());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", taskRouter);
app.use("/", usersRouter);
app.use("/:id", taskRouter);

app.post(
	"/login",
	passport.authenticate("local", { failureRedirect: "/login" }),
	function (req, res) {
		res.redirect("/tasks");
	}
);

app.listen(PORT, (error) => {
	if (!error)
		console.log(
			"Server is Successfully Running,and App is listening on port " + PORT
		);
	else console.log("Error occurred, server can't start", error);
});
