/**
 * BoardController
 *
 * @description :: Server-side logic for managing Boards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	createForm: function(req, res) {
		return res.view('board/create');
	},

	create: function(req, res) {
		Board.create({
			title: req.param('title')
		}, function(err, board) {
			if (err) return res.view('board/create', { message: err });
			return res.redirect('/board/' + board.id);
		});
	},

	joinRoom: function (req, res) {
		var id = req.param('board_id');
		// subscribe user to this room
		sails.sockets.join(req.socket.id, 'board-' + id);
		sails.sockets.broadcast('board-' + id, 'message', { message: 'Now you are connected to board task-' + id });

		res.json({
			success: true,
			message: 'Now you are connected to board task-' + id
		});
	},

	show: function(req, res) {
		var id = req.param('board_id');
		Task.find({  where: { task_board: id } }).populate('owner').exec(function(err, tasks) {
			Board.findOne(id, function(err, board) {
				return res.view('board/show', {
					board: board,
					tasks: tasks
				});
			});
		});
	},

	deleteBoard: function(req, res) {
		var id = req.param('id');
		Board.destroy(id).exec(function(err, board) {
			sails.sockets.broadcast('board-' + id, 'delete_my_board', { message: 'board task-' + id + ' was deleted' });
			sails.sockets.blast('delete_board', {
				board: board
			});
			return res.redirect('/');
		});
	}
};
