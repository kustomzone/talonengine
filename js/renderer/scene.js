// scene.js
// 5 November 2016
// Ravern Koh
// Talon.Scene
'use strict'

// Importing entity files
const Entity = require('./entity.js')

// Global scenes array
const scenes = {}

// Default scene object
const defaultScene = {
  _entities: {},
  add: function(name, entity) {
    this._entities[name] = entity
  }
}

// Main Scene function
const Scene = function(name, setupFunction) {
  let newScene = Object.create(defaultScene)
  setupFunction.call(newScene)
  scenes[name] = newScene
}

// Export the Scene module
module.exports = Scene
