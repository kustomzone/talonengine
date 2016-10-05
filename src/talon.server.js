// talon.server.js
// 4 October 2016 10:33pm
// Ravern Koh
// Server file for Talon Engine
'use strict'

/*
  Attribute declaration
*/

// Overall class
var Server

// Logic variables
var config
var server
var sio

/*
  Function declaration
*/

// Export Server constructor
Server = function(params) {

  // Initialize main attributes
  config = params.config
  server = params.server
  sio = params.sio

  // Load game logic from script
  Server.loadScript()

  // Begin networking
  Server.listen()

  // Return the Server instance
  return Server
}

Server.loadScript = function() {

  // Load script via require
  require.main.require('./' + config.script)

  // Return the Server instance
  return Server
}

Server.listen = function() {

  /*
    Networking code
  */

  // Set event listeners on connection
  sio.sockets.on('connected', function(socket) {

  })

  // Return the Server instance
  return Server
}

// Final assignement to export Server object
module.exports = Server
