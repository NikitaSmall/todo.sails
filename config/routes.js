/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // index page to see list of tasks
  'get /': 'Task.index',

  // route to see specific task with comments
  'get /task/show/:id': 'Task.show',

  // routes to create new tasks
  'get /task/new/:board': 'Task.createTaskForm',
  'post /createTask': 'Task.createTask',

  // route to handle task checkbox click
  'get /task/check/:id': 'Task.checkedTask',

  // handle task deletion
  'post /task/delete/:id': 'Task.deleteTask',

  // handle board deletion
  'post /board/delete/:id': 'Board.deleteBoard',

  // handle manipulating a room
  'get /task/leave': 'Task.leaveRoom',
  'get /task/join': 'Task.joinRoom',
  'get /board/join': 'Board.joinRoom',

  // routes to handle Boards
  'get /board/create': 'Board.createForm',
  'post /board/create': 'Board.create',
  'get /board/:board_id': 'Board.show',

  // routes to create new comment
  'post /comment/create': 'Comment.create',

  // routes to create new users, login and logout
  'get /signup': 'Auth.signupForm',
  'post /signup': 'Auth.signup',
  'get /login': 'Auth.loginForm',
  'post /login': 'Auth.login',
  '/logout': 'Auth.logout'

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
