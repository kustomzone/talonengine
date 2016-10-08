// talon.game.js
// 8 October 2016 4:01pm
// Ravern Koh
// Game file for Talon Engine
'use strict'

/*
  Attribute declaration
*/

// Overall classes
var Talon = {}
var server = true

// Main objects
var _scenes = {}

/*
  Main function declarations
*/
Talon.Scene = function(_, id) {
  var scene = {}

  // Add this scene to the main object
  if (id == undefined) id = Talon._uuid(_scenes)
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

module.exports = Talon

/*-----------------------------------------------------------------------------------------------------------*/

// game.js
// 3 October 2016 9:30pm
// Ravern Koh
// Demo main game file for Talon Engine
'use strict'

// Overriding Talon start function
Talon.start = function() {
  Talon.Scene()
}
