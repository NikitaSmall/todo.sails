/**
* Board.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'string'
    },
    tasks: {
      collection: 'task',
      via: 'task_board'
    }
  },

  afterDestroy: function(destroyedBoards, cb) {
    Task.destroy({ task_board: _.pluck(destroyedBoards, 'id') }).exec(cb);
  }
};
