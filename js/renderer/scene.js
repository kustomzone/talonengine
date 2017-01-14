// Scene.js
// 5 November 2016
// Ravern Koh
// Talon.Scene
'use strict'

// Importing entity files
const Talon = require('talonengine')
const Entity = Talon.Entity
const util = Talon._util

// Global scenes array
let currentSceneName = ''
const scenes = {}

// Default scene object
const defaultScene = {
  _rootEntity: null,
  // Debug functions
  printHierachy: function() {
    const _printHierachy = function(tier, entity) {
      let string = ''
      for (let i = 0; i < tier; i++) string += '\t'
      console.log(string + tier + '\t' + entity.id)
      for (let key in entity.children) _printHierachy(tier + 1, entity.children[key])
    }
    _printHierachy(0, this._rootEntity)
  }
}

// Main Scene function
const Scene = function(name, params, setupFunction) {
  let newScene = util.merge(defaultScene, {})
  scenes[name] = newScene

  // Setup root entity
  let rootEntity = Entity._Instantiate('__Root', 'root', null, params, function() {
    this._scene = newScene
    this.add('DefaultCamera', 'defaultCamera', {})
    setupFunction.call(this)
  })
  newScene._rootEntity = rootEntity

  // Create scene loop
  setInterval(function() {
    Talon.Time._update()
    const _update = function(entity) {
      for (let key in entity._components) {
        entity._components[key]._update()
      }
      for (let key in entity._children) {
        _update(entity._children[key])
      }
    }
    _update(rootEntity)
  }, 0)
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
