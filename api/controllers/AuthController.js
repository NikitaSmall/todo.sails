/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
var bcrypt = require('bcrypt');

module.exports = {
	_config: {
		actions: false,
		shortcuts: false,
		rest: false
	},

	loginForm: function(req, res) {
		return res.view('user/login');
	},

	signupForm: function(req, res) {
		return res.view('user/signup');
	},

	login: function(req, res) {
		passport.authenticate('local', function(err, user, info) {
			if ((err) || (!user)) {
				return res.view('user/login', {
					message: info.message,
					user: user
				});
			}
			req.logIn(user, function(err) {
				if (err) {
					return res.view('user/login', {
							message: err
					});
				}
				return res.redirect('/');
				// message about user
				/*
				{
					message: info.message,
					user: user
				}
				*/
			});
		})(req, res);
	},

	signup: function(req, res) {
		User.create({
			username: req.param('username'),
			email: req.param('email'),
			password: req.param('password')
		}, function(err) {
			if (err) return res.view('user/login', {
					message: err
				});
			return res.redirect('/login');
		});
	},

	logout: function(req, res) {
		req.logout();
		res.redirect('/');
	}
};
