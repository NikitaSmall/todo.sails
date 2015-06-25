$(document).ready(function() {
  $('.task-checkbox').click(function() {
    var id = $(this).data('id');
    $.get('/task/check/' + id);
  });

  // someone created new task
  io.socket.on('created_task', function (msg) {
    console.log(msg);
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
