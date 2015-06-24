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
		Task.find({}, function(err, tasks) {
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
		}, function(err) {
			return res.redirect('/board/' + req.param('board'));
		});
	}
};
