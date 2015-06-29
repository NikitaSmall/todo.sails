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

	joinRoom: function (req, res) {
		var id = req.param('task_id');
		// subscribe user to this room
		sails.sockets.join(req.socket.id, 'task-' + id);
		sails.sockets.broadcast('task-' + id, 'message', { message: 'Now you are connected to room task-' + id });

		res.json({
			success: true,
			message: 'Now you are connected to room task-' + id
		});
	},

	leaveRoom: function (req, res) {
		var rooms = sails.sockets.socketRooms(req.socket.id);
		for (var i in rooms) {
			sails.sockets.leave(req.socket.id, rooms[i]);
		}
		res.json({
			message: 'leaving a rooms',
			rooms: rooms
		});
	},

	// show task with information
	show: function (req, res) {
		Task.findOne(req.param('id')).populate('owner').exec(function(e, task) {
			Comment.find({
					where: {task: req.param('id') }
				}).populate('author').exec(function(e, comments) {
				return res.view('task/show', {
					task: task,
					comments: comments
				});
			});
		});
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
			sails.sockets.broadcast('board-' + task.task_board, 'created_task', {
				message: 'User# ' + req.user.id + ' created a task - task# ' + task.id,
				task: task,
				owner: req.user
			});
			return res.redirect('/board/' + req.param('board'));
		});
	},

	deleteTask: function (req, res) {
		var id = req.param('id');
		if (id == 'undefined') return res.json(500, { message: 'error' });

		Task.destroy(id).exec(function(err, task) {
			sails.sockets.broadcast('board-' + task.task_board, 'message', {
				message: 'task was destroyed',
				task: task
			});
			return res.json(200, { message: 'successful deletion of task# ' + task.id });
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
