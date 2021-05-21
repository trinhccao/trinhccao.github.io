const http = require('http').createServer();
const io = require('socket.io')(http, {
  origin: '*'
});

io.on('connection', function(socket) {
  console.log('a connection opened');
  socket.on('disconnect', function() {
    console.log('a connection disconnected');
  })
});

http.listen(8888);