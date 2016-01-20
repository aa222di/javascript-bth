// Always check and explicitly allow the origin
function originIsAllowed(origin) {
  if(origin === 'http://dbwebb.se' || origin === 'http://localhost' || origin === 'http://www.student.bth.se') {
    return true;    
  }
  return false;
}

/**
 * Avoid injections
 *
 */
function htmlEntities(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


/**
 * Accept connection under the echo-protocol
 *
 */
function acceptConnectionAsEcho(request) {
  var connection = request.accept('echo-protocol', request.origin);
  console.log((new Date()) + ' Connection accepted from ' + request.origin + ' with echo-protocol');

  // Callback to handle each message from the client
  connection.on('message', function(message) {
      if (message.type === 'utf8') {
          console.log('Received Message: ' + message.utf8Data);
          connection.sendUTF(message.utf8Data);
      }
      else if (message.type === 'binary') {
          console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
          connection.sendBytes(message.binaryData);
      }
  });
  
  // Callback when client closes the connection
  connection.on('close', function(reasonCode, description) {
      console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });

  return tru
}

/**
 * Accept connection under the broadcast-protocol
 *
 */
function acceptConnectionAsBroadcast(request) {
  var connection = request.accept('broadcast-protocol', request.origin);
  connection.broadcastId = broadcastTo.push(connection) - 1;
  console.log((new Date()) + ' Broadcast connection accepted from ' + request.origin + ' id = ' + connection.broadcastId);

  // Callback to handle each message from the client
  connection.on('message', function(message) {
    var clients = 0;
    for(var i=0; i<broadcastTo.length; i++) {
      if(broadcastTo[i]) {
        clients++;
        broadcastTo[i].sendUTF(htmlEntities(message.utf8Data));
      }
    }
    console.log('Broadcasted message to ' + clients + ' clients: ' + message.utf8Data);
  });
  
  // Callback when client closes the connection
  connection.on('close', function(reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected broadcastid = ' + connection.broadcastId + '.');
    broadcastTo[connection.broadcastId] = null;
  });

  return true;
}

var port = 8004;
var broadcastTo = [];

// Require the modules we need
var http = require('http');

// Create a http server with a callback handling all requests
var httpServer = http.createServer(function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(200, {'Content-type': 'text/plain'});
  response.end('Hello world\n');
});

// Setup the http-server to listen to a port
httpServer.listen(port, function() {
  console.log((new Date()) + ' HTTP server is listening on port ' + port);
});


// Require the modules we need
var WebSocketServer = require('/home/saxon/teachers/com/mosstud/www/node/node_modules/websocket').server;

// Create an object for the websocket
// https://github.com/Worlize/WebSocket-Node/wiki/Documentation
wsServer = new WebSocketServer({
  httpServer: httpServer,
  autoAcceptConnections: false
});

// Create a callback to handle each connection request
wsServer.on('request', function(request) {


  var protocols = request.requestedProtocols;
    console.log(protocols);

  if (!originIsAllowed(request.origin)) {
    // Make sure we only accept requests from an allowed origin
    request.reject();
    console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
    return;
  }

  // Loop through protocols. Accept by highest order first.
  var status = null;
  for (var i=0; i < protocols.length; i++) {
    if(protocols[i] === 'broadcast-protocol') {
      status = acceptConnectionAsBroadcast(request);
    } else if(protocols[i] === 'echo-protocol') {
      status = acceptConnectionAsEcho(request);
    }
  };

   // Unsupported protocol.
  if(!status) {
    //acceptConnectionAsEcho(request, null);
    console.log('Subprotocol not supported');
    request.reject(403, 'Subprotocol not supported, only supporting "echo-protocol" or "broadcast-protocol".');
  }


});