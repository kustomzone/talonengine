// talon.js
// 3 October 2016 9:30pm
// Ravern Koh
// main file for Talon Engine
'use strict'

// Export Talon constructor
module.exports = function(port) {
  // Create express app
  var express = require('express')
  var app = express()

  // Create http server from express app
  var server = require('http').Server(app)
  server.listen(process.env.PORT || (port ? port : 8001))

  // Create socket.io instance from http server
  var sio = require('socket.io')(server)

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
}
