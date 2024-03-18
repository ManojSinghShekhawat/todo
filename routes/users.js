const express = require("express");
const router = express.Router();
// const { isLoggedIn } = require("../missleware.js");
const userController = require("../controllers/users.js");
const passport = require("passport");

router.route("/login").get(userController.renderLogin);
// .post(
// 	passport.authenticate("local", {
// 		logger,
// 		successRedirect: "/tasks",
// 		failureRedirect: "/login",
// 	})
// );
router
	.route("/signup")
	.get(userController.renderSignup)
	.post(userController.signup);
router.route("/logout").get(userController.logout);

module.exports = router;
