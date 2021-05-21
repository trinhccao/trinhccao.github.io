const WebSocket = require('ws');

const ws = new WebSocket.Server({
  port: 8888
});

ws.on('connection', function(ws) {
  console.log('a connection opened');
  ws.on('close', function() {
    console.log('a connection closed');
  })
});