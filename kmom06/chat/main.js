/**
 * Place your JS-code here.
 */
var dbwebb = document.getElementById('dbwebb'),
    localhost = document.getElementById('localhost'),
    send = document.getElementById('send-message'),
    chat = document.getElementById('chat'),
    alias,
    websocket;

var createWebSocketConnection = function(url) {

  console.log('Connecting to: ' + url);
  websocket = new WebSocket(url, 'broadcast-protocol');


 
  // Eventhandler when the websocket is opened.
  websocket.onopen = function() {
    console.log('The websocket is now open.');
    websocket.send(alias + ' : Nu är jag ansluten');
    chat.innerHTML += "<p>Ansluten till chatten som " + alias + "</p>";
  }
 
  websocket.onmessage = function(event) {
    console.log('Receiving message: ' + event.data);
    var data = event.data.split(':');
    chat.innerHTML += "<p><b>" + data[0] + ": </b>" + data[1] + "</p>";
  }
 
  // Eventhandler when the websocket is closed.
  websocket.onclose = function() {
    console.log('The websocket is now closed.');
  }
};
 
// Event handler to create the websocket connection when someone clicks the button #connect
dbwebb.addEventListener('click', function(event) {
  alias = document.getElementById('alias').value;
  if(alias) {
    createWebSocketConnection(this.value);
  }
  else {
    chat.innerHTML += '<p>Du måste välja ett namn för att gå in i chattrummet</p>';
  }

} , false);

localhost.addEventListener('click', function(event) {
  alias = document.getElementById('alias').value;
  if(alias) {
    createWebSocketConnection(this.value);
  } 
  else {
    chat.innerHTML += '<p>Du måste välja ett namn för att gå in i chattrummet</p>';
  } 

} , false);



// Add eventhandler to send message
send.addEventListener('click', function(event) {
  event.preventDefault();
  var message = document.getElementById('message').value;
  document.getElementById('message').value = null;


  if(message) {
    if(!websocket || websocket.readyState === 3) {
      console.log('The websocket is not connected to a server.');
    } else {
      console.log("Sending message: " + message);
      websocket.send(alias + ": " + message);      
    }
  }
});