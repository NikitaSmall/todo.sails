/**
* Task.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    complete: {
      type: 'boolean'
    },
    owner: {
      model: 'user'
    },
    task_board: {
      model: 'board'
    }
  },

  checkTask: function(task_id, cb) {
    Task.findOne(task_id).exec(function(err, task) {
      if (err) return cb(err);
      if (!task) return cb(new Error('task not found.'));

      task.complete = !task.complete;
      task.save();
      cb(task);
    });
  }
};
