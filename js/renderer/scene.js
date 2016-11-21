// scene.js
// 5 November 2016
// Ravern Koh
// Talon.Scene
'use strict'

// Importing entity files
const Entity = require('./entity.js')
const util = require('../util.js')

// Global scenes array
let currentSceneName = ''
const scenes = {}

// Default scene object
const defaultScene = {
  _rootEntity: {},
  // Debug functions
  printHierachy: function() {
    const _printHierachy = function(tier, entity) {
      let string = tier + ' '
      for (let i = 0; i < tier; i++) string += '\t'
      console.log(string + entity._id)
      for (key in entity._children) _printHierachy(tier + 1, entity._children[key])
    }
    _printHierachy(0, this._rootEntity['root'])
  }
}

// Main Scene function
const Scene = function(name, setupFunction) {
  let newScene = util.merge(defaultScene, {})
  scenes[name] = newScene

  // Setup root entity
  let rootEntity = Entity._Instantiate('Root', function() {
    this.component('Root')._init()
    setupFunction.call(this)
  })
  rootEntity._id = 'root'
  rootEntity._parent['root'] = rootEntity
  scenes[name]._rootEntity[rootEntity._id] = rootEntity
}

// Set current scene
Scene.present = function(name) {
  currentSceneName = name
}

// Accessor for Scenes
Scene.currentScene = function() {
  return scenes[currentSceneName]
}

// Export the Scene module
module.exports = Scene
