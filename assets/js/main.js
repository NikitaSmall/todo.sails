$(document).ready(function() {
  $('.task-checkbox').click(function() {
    var id = $(this).data('id');
    $.get('/task/check/' + id);
  });

  // someone created new task
  io.socket.on('created_task', function (msg) {
    console.log(msg);
    var task = msg.task;

    $('.check-list').append('<tr class="task-row-'+ task.id + '">' +
    '<td><input type="checkbox" data-id="' + task.id + '"/></td>' +
    '<td>' + task.title + '</td>' +
    '<td>' + task.description + '</td>' +
    '<td>' + msg.owner.username + '</td></tr>');
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
