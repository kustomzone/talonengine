// Camera.js
// 22 December 2016
// Ravern Koh
// Camera (built-in component)
'use strict'

const Talon = require('talonengine')

Talon.Component('Camera', {

  // Override
  init: function() {

  },
  update: function() {

  },


  // Getters and setters
  set backgroundColor(value) {
    this._backgroundColor = value
  },
  get backgroundColor() {
    return this._backgroundColor
  },
  set letterboxColor(value) {
    this._letterboxColor = value
  },
  get letterboxColor() {
    return this._letterboxColor
  },


  // Methods
  setActive: function() {
    
  }
})
