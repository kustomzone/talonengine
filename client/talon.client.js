// talon.client.js
// 3 October 2016 9:30pm
// Ravern Koh
// Client file for Talon Engine
'use strict'

/*
  Global Talon object declaration
*/
var Talon = {}

/*
  Attributes declaration
*/
var socket = io.connect()

/*
  Socket events declarations
*/
socket.on('start', function() {
  // Talon._start()
})

/*
  Construct method declarations
*/
Talon.Scene = function(Scene) {
  var scene = {
    _present: function() {

    },
    _draw: function() {

    }
  }
  Scene.call(scene)

  // Return the Talon
  return Talon
}
