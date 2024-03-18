const mongoose = require("mongoose");
const User = require("./users.js");

const taskSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	task: {
		type: String,
		required: true,
	},
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
