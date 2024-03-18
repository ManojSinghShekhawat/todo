const path = require("path/posix");
const Task = require("../models/tasks.js");
const mongoose = require("mongoose");

module.exports.tasks = async (req, res) => {
	const id = req.user._id;
	const data = await Task.find({ user: id });
	// console.log(data);
	res.render("tasks.ejs", { data: data, message: req.flash("info") });
};

module.exports.createtask = async (req, res) => {
	const newTask = req.body;
	newTask.user = req.user;
	const createdTask = await Task.create(newTask);
	req.flash("ingo", "Task added");
	res.redirect("/tasks");
};

module.exports.deleteTask = async (req, res) => {
	const { id } = req.params;
	await Task.findByIdAndDelete(id);
	req.f;
	res.redirect("/tasks");
};
