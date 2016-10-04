// talon.js
// 3 October 2016 9:30pm
// Ravern Koh
// Main file for Talon Engine
'use strict'

/*
  Misc. Attribute declaration
*/
var initialized


/*
  Attribute declaration
*/

// Overall classes
var Talon
var Server

// Logic variables
var config = {
  size: { width: 1280, height: 720 }, // Size of the game view
  scripts: [] // Developer scripts
}


/*
  Function declarations
*/

// Export Talon constructor
Talon = function() {

  // TODO init code

  // Return the Talon instance
  return Talon
}

// Configure method to set params
Talon.configure = function(newConfig) {

  // Copy new config into global config
  for (var key in newConfig) config[key] = newConfig[key]

  // Return the Talon instance
  return Talon
}

// Starts the server on param:port
Talon.start = function(port) {

  // If not initialzed, initialize Talon instance
  if (!initialized) module.exports()

  /*
    Setup Node.js server code
  */

  // Create express app
  var express = require('express')
  var app = express()

  // Create http server from express app
  var server = require('http').Server(app)
  server.listen(process.env.PORT || (port ? port : 8001))

  //Create path instance for resolution of paths
  var path = require('path')

  // Set '/' to the '/public' directory
  app.use('/', express.static(process.env.PWD + '/public'))
  // Set '/lib' for client to the '/lib' directory in talonengine
  app.use('/lib', express.static(path.resolve(__dirname + '/../lib')))
  app.get('/', function(req, res) {
    // Resolve path to prevent 'Forbidden Error' due to '/..'
    res.sendFile(path.resolve(__dirname + '/../index.html'))
  })

  // Create socket.io instance from http server
  var sio = require('socket.io')(server)


  /*
    Setup Talon.Server
  */

  // Initialize Talon.Server instance
  Server = require('./talon.server.js')({
    config: config,
    server: server,
    sio: sio
  })


  // Return the Talon instance
  return Talon
}

// Final assignment to export Talon object
module.exports = Talon
