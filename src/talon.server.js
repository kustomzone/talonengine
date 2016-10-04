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

  // Return the Server instance
  return Server
}

Server.loadScripts = function() {

  // Return the Server instance
  return Server
}

// Final assignement to export Server object
module.exports = Server
