// Camera.js
// 22 December 2016
// Ravern Koh
// Camera (built-in component)
'use strict'

const Talon = require('talonengine')

Talon.Component('Camera', {

  // Attribute
  _letterboxColor: 'black',
  _backgroundColor: 'white',
  // this._static.gl
  // this._static.notFirst

  // Override
  init: function() {

  },
  update: function() {

  },


  // Getters and setters
  set letterboxColor(value) {
    this._letterboxColor = value
    if (this._static.notFirst == undefined) {
      this._static.notFirst = true

      // Do setup code
      const canvas = document.getElementById('canvas')
      this._static.gl = canvas.getContext('webgl')
    }

    // Convenience var
    const gl = this._static.gl
    const color = Talon._util.color(this.letterboxColor)
    gl.clearColor(color[0], color[1], color[2], color[3])
  },
  get letterboxColor() {
    return this._letterboxColor
  },
  set backgroundColor(value) {
    this._backgroundColor = value

    this.entity.component('Renderer').mesh = 'defaultRectangle ' + Talon._options.window.width + ' ' + Talon._options.window.width / Talon._options.window.aspect + ' ' + this.backgroundColor
  },
  get backgroundColor() {
    return this._backgroundColor
  },


  // Methods
  setActive: function() {

  }
})
