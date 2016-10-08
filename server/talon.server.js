// talon.server.js
// 3 October 2016 9:30pm
// Ravern Koh
// Server file for Talon Engine
'use strict'

/*
  Misc. Attribute declaration
*/

var initialized


/*
  Attribute declaration
*/

// Overall classes
var Server

// Logic variables
var config = {
  size: { width: 1280, height: 720 }, // Size of the game view
  script: 'game.js' // Developer scripts
}


/*
  Function declarations
*/

// Export Server constructor
Server = function() {

  // TODO init code

  // Return the Server instance
  return Server
}

// Configure method to set params
Server.configure = function(newConfig) {

  // Copy new config into global config
  for (var key in newConfig) config[key] = newConfig[key]

  // Return the Server instance
  return Server
}

// Starts the server on param:port
Server.start = function(port) {

  // If not initialzed, initialize Server instance
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

  // Create socket.io instance from http server
  var sio = require('socket.io')(server)

  // Create path instance for resolution of paths
  var path = require('path')
  // Create fs instance to load files
  var fs = require('fs')

  // Set '/game' to the '/game' directory
  app.use('/game', express.static(process.env.PWD + '/game'))
  // Set '/client' for client to the '/client' directory in talonengine
  app.use('/client', express.static(path.resolve(__dirname + '/../client')))
  app.get('/', function(req, res) {

    // Load modules to edit HTML file
    var jsdom = require('jsdom')
    // Read in file from fs
    fs.readFile(__dirname + '/../index.html', 'utf8', function(error, data) {
      // Add in config.script into client file
      jsdom.env(data, [], function(error, window) {
        var script = window.document.createElement('script')
        script.src = '/game/' + config.script
        window.document.getElementById('scripts').appendChild(script)

        fs.writeFile(__dirname + '/../build/build.html', window.document.documentElement.outerHTML, function(error) {
          // Resolve path to prevent 'Forbidden Error' due to '/..'
          res.sendFile(path.resolve(__dirname + '/../build/build.html'))
        })
      })
    })
  })

  // Load script to server
  fs.readFile(process.env.PWD + '/game/' + config.script, 'utf8', function(error, data) {
    // Load talon script to server
    fs.readFile(__dirname + '/talon.game.js', 'utf8', function(error, data2) {
      // Add Server definition to top and Server = module.exports to bottom of file
      data = data2 + '\n/*-----------------------------------------------------------------------------------------------------------*/\n\n' + data

      // Write the new file to a different location
      fs.writeFile(__dirname + '/../build/build.js', data, function(error) {

        // Require the Talon instance from config.script
        var Talon = require('../build/build.js')
        // Start the game
        Server._startTalon(Talon, sio)
      })
    })
  })

  // Return the Server instance
  return Server
}

// Where all the game code is
Server._startTalon = function(Talon, sio) {

  /*
    Starting up the scene
  */
  // Load scenes
  Talon.start()

  /*
    Socket methods
  */
  // Socket connection event
  sio.sockets.on('connection', function(socket) {
    // Acknowledge and load client
    socket.emit('start')
  })

  // Return the Talon instance
  return Talon
}

// Final assignment to export Server object
module.exports = Server
