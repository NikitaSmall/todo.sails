/**
 * CommentController
 *
 * @description :: Server-side logic for managing Comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req, res) {
		Comment.create({
			text: req.param('text'),
			author: req.user.id,
			task: req.param('task_id')
		}, function(err, comment) {
			// search user for proper author name
			User.findOne(req.user.id).exec(function(err, user) {
				sails.sockets.broadcast('task-' + req.param('task_id'), 'created_comment', {
					message: 'new comment was created',
					comment: comment,
					user: user
				});
			});

			return res.redirect('/task/show/' + req.param('task_id'));
		});
	}

};
