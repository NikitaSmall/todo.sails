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

	show: function(req, res) {
		var id = req.param('board_id');
		Board.findOne(id).populate('tasks').exec(function(err, board) {
			return res.view('board/show', {
				board: board
			});
		});
	}
};
