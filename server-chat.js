var express = require('express')
    , app  = express()
    , http = require('http').Server(app)
    , io   = require('socket.io')(http)
    , bodyParser = require('body-parser')
    , path = require('path')
    , moment = require('moment')
    //, _ = require('underscore')
    //, cluster = require('cluster')
    //, uuid = require('node-uuid')
    //, morgan = require('morgan')
    //, fs = require('fs')
    , mock = require('./mock/mock.js')
    , numUsers = 0;

// -------------------------------------------------------

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// -------------------------------------------------------

app.get('/status', function(req, res) {
	res.send({ 
    status : "OK",
    connections : numUsers 
  });
});

app.post('/api/login', function(req, res) {
  console.log('[LOGIN] Received login request for: (' + req.body.user + '/' + req.body.pass + ')');

  var user = mock.lookUpUserIntoDB(req.body.user);
  if(user) {
    res.send(user);
  } else {
    res.sendStatus(400);
  }
});

// -------------------------------------------------------
// io.set('transports', [ 'websocket', 'xhr-polling' ]);
// -------------------------------------------------------

// -------------------------------------------------------

/**
 * CheatSheet:
 *   - socket.on('eventName', callback) : executes the callback when an event with a given name is fired
 *   - socket.emit('eventName', data1, data2): sends only to the connected client the event and two parameters with data
 *   - io.sockets.emit('eventName', data1, data2): same but sends to all connected clients
 *   - socket.broadcast.emit('eventName', data1, data2): same but sends to all connected clients except the emitter
 *   - socket.join(room_name) and socket.leave(room_name) : when joining a non existing room it creates it
 *   - socket.broadcast.to(room_name).emit('eventName', {data:toSend}): similar to socket.broadcast.emit, sends a message to all clients in the room except the emitter
 *   - io.sockets.in(room_name).emit(...) : sends to all clients in the room
 *   - io.of('/namespaceName').emit('eventName', { data: 'tosend'}) : Like rooms, we can create namespaces, to emit an event to all the clients that connected to it
 */
io.on('connection', function(clientSocket) { 
  
  numUsers++;
  console.log("Client new connection: " + clientSocket.id + " [" + numUsers + "]");

  // Join the user into selected rooms
  clientSocket.on('join:init', function(joinInitInfo) {
    console.log(JSON.stringify(joinInitInfo));
    _.each(joinInitInfo.rooms, function(roomToJoin) {
      clientSocket.join(roomToJoin.id);
      console.log('User "' + clientSocket.id + '" joined to "' + roomToJoin.title + '" [' + roomToJoin.id + ']');
      clientSocket.broadcast.to(roomToJoin.id).emit('join:logged-user', {
        action : 'LOGIN',
        room : roomToJoin.id,
        who : joinInitInfo.who,
        avatar : joinInitInfo.avatar
      });
    });
  });
  
  // Receive new message and resend it to the others
  clientSocket.on('msg:send-message', function(data) {
    io.sockets.to(data.room).emit('msg:recv-message', {
      roomId : data.room,
      sender : data.sender,
      message : data.message,
      timestamp : new Date(),
      avatar : data.avatar
    }); 
  });

  // Disconnect the current user and decrement the current users
  clientSocket.on('disconnect', function() {
    numUsers--;
    console.log('User disconnected: ' + clientSocket.id);
  });

});

// Starts server listening
http.listen(process.env.PORT || 3000, function() {
  console.log('Server listening on *:' + (process.env.PORT || 3000));
});