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
var _socket = io.connect()
var _scenes = {}

/*
  Socket events declarations
*/
_socket.on('start', function() {
  // Talon._start()
})

/*
  Construct function declarations
*/
Talon.Scene = function(Scene, id) {
  var scene = {
    _present: function() {

    },
    _draw: function() {

    }
  }
  Scene.call(scene)

  // Add this scene to the main object
  if (id == undefined) id = Talon._uuid(scenes)
  _scenes[id] = scene

  // Return the Talon instance
  return Talon
}

/*
  Utility functions
*/

// Unique ID generation
Talon._uuid = function(dict) {
  var uuid
  while (dict[(uuid = Math.random())] != undefined) {}
  return uuid
}
