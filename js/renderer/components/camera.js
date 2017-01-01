// camera.js
// 22 December 2016
// Ravern Koh
// Camera (built-in component)
'use strict'

const Talon = require('talonengine')

const Component = require('../component.js')

Component('Camera', {

  // Default attributes
  _backgroundColor: 'white',


  // Override
  init: function() {
    // Helper vars
    // Only available after initiation, thats why this is not a default variable
    this._background = document.getElementById('background')
    this._mainGroup = document.getElementById('mainGroup')

    if (this.entity._id == 'defaultCamera') this.setActive()
  },
  update: function() {
    if (this._static.activeCamera == this.entity) {
      // Set background color
      this._background.setAttribute('fill', this.backgroundColor)

      // Moving mainGroup to simulate camera
      const transformString = this._generateTransformString()
      this._mainGroup.setAttribute('transform', transformString)
    }
  },


  // Getters and setters
  set backgroundColor(value) {
    this._backgroundColor = value
    this._background.setAttribute('fill', this.backgroundColor)
  },
  get backgroundColor() {
    return this._backgroundColor
  },


  // Methods
  setActive: function() {
    if (this._static.activeCamera == this.entity) return
    this._static.activeCamera = this.entity
  },
  _generateTransformString: function() {
    let transformString = ''

    // Translating
    transformString += 'translate('
    transformString += (-this.transform.position.x + Talon._options.window.width / 2) + ', ' + (-this.transform.position.y + Talon._options.window.width / Talon._options.window.aspect / 2) + ') '

    // Rotating
    transformString += 'rotate('
    transformString += -this.transform.rotation + ', ' + this.transform.position.x + ', ' + this.transform.position.y + ') '

    // Scaling
    transformString += 'translate('
    transformString += this.transform.position.x + ', ' + this.transform.position.y + ') '
    transformString += 'scale('
    transformString += (1 / this.transform.scale.x) + ', ' + (1 / this.transform.scale.y) + ') '
    transformString += 'translate('
    transformString += -this.transform.position.x + ', ' + -this.transform.position.y + ') '

    return transformString
  }
})
