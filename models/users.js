const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("USER", userSchema);
module.exports = User;
