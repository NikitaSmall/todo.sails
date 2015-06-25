$(document).ready(function() {
  $('#task-checkbox').click(function() {
    var id = $(this).data('id');
    $.get('/task/check/' + id);
  });

  io.socket.on('created_task', function (msg) {
    console.log(msg);
  });
});
