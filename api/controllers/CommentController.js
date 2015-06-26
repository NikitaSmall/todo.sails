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
			return res.redirect('/task/show/' + req.param('task_id'));
		});
	}

};
