$(document).ready(function() {
  io.socket.on('created_task', function (msg) {
    console.log(msg);
  });
});
