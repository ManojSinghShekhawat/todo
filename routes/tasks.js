const express = require("express");
const router = express.Router();
const { isLoggedIn, logger } = require("../missleware.js");
const taskController = require("../controllers/tasks.js");

router
	.route("/tasks")
	.get(isLoggedIn, taskController.tasks)
	.post(isLoggedIn, taskController.createtask);

router.route("/:id").delete(taskController.deleteTask);

module.exports = router;
