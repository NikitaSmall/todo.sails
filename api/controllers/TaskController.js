/**
 * TaskController
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// list of tasks action
	index: function (req, res) {
		// find all the records
		Task.find({ where: { owner: req.user.id }, limit: 10 }, function(e, tasks) {
			// and show them into the view
			return res.view('task/index',{
				tasks: tasks
			});
		});
	},

	createTaskForm: function (req, res) {
		return res.view('task/new');
	},

	// create a new task
	createTask: function (req, res) {
		Task.create({
			title: req.param('title', 'Unnamed'),
			description: req.param('description', ''),
			owner: req.user.id,
			task_board: req.param('board'),
			complete: false
		}, function(err, task) {
			// blast a test socket message
			sails.sockets.blast('created_task', {
				message: 'User# ' + req.user.id + ' created a task - task# ' + task.id,
				task: task,
				owner: req.user
			});
			return res.redirect('/board/' + req.param('board'));
		});
	},

	checkedTask: function (req, res) {
		Task.checkTask(req.param('id'), function(task) {
			// blast socket message about checked task
      sails.sockets.blast('checked_task', {
				message: 'check task#' + task.id,
        task: task
			});
			return res.ok();
		});
	}
};
