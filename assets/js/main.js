$(document).ready(function() {
  $(document).on('click', '.task-checkbox', function() {
    var id = $(this).data('id');
    $.get('/task/check/' + id);
  });

  $(document).on('click', '.task-delete', function() {
    var id = $(this).data('id');
    $.post('/task/delete/' + id);
    $('.task-row-' + id).hide('slow');
  });

  // blast to leave room
  // if (!$('#task-show')[0]) {
  //   io.socket.get('/task/leave', function(response) {
  //     console.log(response);
  //   });
  // }

  // blast to join room
  if ($('#task-show')[0]) {
    var id = $('.task-checkbox').data('id');
    io.socket.get('/task/join', { task_id: id });
  }

  if ($('.board-show')[0]) {
    var id = $('.board-show').data('id');
    io.socket.get('/board/join', { board_id: id });
  }

  // handle debug message
  io.socket.on('message', function(msg) {
    console.log(msg);
  });

  // someone in room created a comment
  io.socket.on('created_comment', function(msg) {
    var comment = msg.comment;
    var user = msg.user;

    $('#comments').append('<div class="row comment">' +
    user.username + ': ' + comment.text +
    '</div>');
  });

  // someone created new task
  io.socket.on('created_task', function(msg) {
    console.log(msg);
    var task = msg.task;

    $('.check-list').append('<tr class="task-row-'+ task.id + '">' +
    '<td><input type="checkbox" data-id="' + task.id + '"/></td>' +
    '<td>' + task.title + '</td>' +
    '<td>' + task.description + '</td>' +
    '<td>' + msg.owner.username + '</td>' +
    '<td>' + '<span data-id="' + task.id + '" class="task-delete button allert">Удалить задачу</span>' + '</td>' +
    '</tr>');
  });

  // delete a task
  io.socket.on('deleted_task', function(msg) {
    console.log(msg);
    var task = msg.task;
    $('.task-row-' + task.id).hide('slow');
  });

  // someone checked a task
  io.socket.on('checked_task', function(msg) {
    console.log(msg);
    var task = msg.task;

    var $checkbox = $('*[data-id="' + task.id + '"]');
    if ($checkbox) {
      $checkbox.prop('checked', task.complete);
    }
  });
});
