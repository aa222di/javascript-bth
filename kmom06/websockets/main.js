/**
 * Place your JS-code here.
 */
var url = document.getElementById('url'),
    connectEcho = document.getElementById('connect-echo'),
    connectBroadcast = document.getElementById('connect-broadcast'),
    send = document.getElementById('send'),
    websocket;
 
// Event handler to create the websocket connection when someone clicks the button #connect
connectEcho.addEventListener('click', function(event) {
  console.log('Connecting to: ' + url.value);
  websocket = new WebSocket(url.value, 'echo-protocol');
 
  // Eventhandler when the websocket is opened.
  websocket.onopen = function() {
    console.log('The websocket is now open.');
    websocket.send('Client says: Thanks for letting me connect to you.');
  }
 
  websocket.onmessage = function(event) {
    console.log('Receiving message: ' + event.data);
  }
 
  // Eventhandler when the websocket is closed.
  websocket.onclose = function() {
    console.log('The websocket is now closed.');
  }
} , false);


// Event handler to create the websocket connection when someone clicks the button #connect
connectBroadcast.addEventListener('click', function(event) {
  console.log('Connecting to: ' + url.value);
  websocket = new WebSocket(url.value, 'broadcast-protocol');
 
  // Eventhandler when the websocket is opened.
  websocket.onopen = function() {
    console.log('The websocket is now open.');
    websocket.send('Client says: Thanks for letting me connect to you.');
  }
 
  websocket.onmessage = function(event) {
    console.log('Receiving message: ' + event.data);
    console.log(event);
  }
 
  // Eventhandler when the websocket is closed.
  websocket.onclose = function() {
    console.log('The websocket is now closed.');
  }
} , false);

// Add eventhandler to send message
send.addEventListener('click', function(event) {
  var message = "Hello World";
 
  if(!websocket || websocket.readyState === 3) {
    console.log('The websocket is not connected to a server.');
  } else {
    console.log("Sending message: " + message);
    websocket.send(message);      
  }
});