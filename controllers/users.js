const User = require("../models/users.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");

module.exports.renderSignup = (req, res) => {
	res.render("signup.ejs", { message: req.flash("info") });
};

module.exports.signup = async (req, res, next) => {
	try {
		let { username, email, password } = req.body;
		const newUser = new User({
			email,
			username,
		});

		const registeredUser = await User.register(newUser, password);
		req.login(registeredUser, (err) => {
			if (err) {
				return next(err);
			}
			req.flash("info", "Welcome to your todos");
			res.redirect("/Tasks");
		});
	} catch (e) {
		console.log(e.message);
		req.flash("info", "Signup first");
		res.redirect("/signup");
	}
};

module.exports.renderLogin = (req, res) => {
	res.render("login.ejs", { message: req.flash("info") });
};

// module.exports.login = passport.authenticate("local", {
// 	successRedirect: "/tasks",
// 	failureRedirect: "/login",
// });

module.exports.logout = (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		req.flash("info", "You are logout successfully");
		res.redirect("/login");
	});
};
