// Collider.js
// 6 January 2017
// Ravern Koh
// Collider (built-in component)
'use strict'

const Talon = require('talonengine')

Talon.Component('Collider', {

  // Default atttributes
  _layer: 'main',
  _mesh: 'auto',
  _colliding: {},

  // Override
  init: function() {

  },
  update: function() {

  },

  // Getters and setters
  set layer(value) {
    if (this._static.notFirst == undefined) {
      this._static.notFirst = true
      // Do first time setup
      this._static.layers = { 'main': {} }
    }

    if (value != 'main' && value == this.layer) return

    this._static.layers[this.layer][this.entity.id] = undefined
    this._layer = value

    let layer = this._static.layers[this.layer]
    if (layer == undefined) this._static.layers[this.layer] = {}

    this._static.layers[this.layer][this.entity.id] = this
  },
  get layer() {
    return this._layer
  },
  set mesh(value) {
    this._mesh = value

    if (this.mesh == 'auto') {
      // Load mesh from Renderer
    } else if (this.mesh.startsWith('default')) {
      // Load as primitive collider
      const stringArr = this.mesh.split(' ')
      if (this.mesh.startsWith('defaultRectangle') || this.mesh.startsWith('defaultEllipse')) {
        // Rectangle & Circle

        // More default attributes
        let width = 100
        let height = 100

        if (stringArr.length >= 2) {
          width = parseInt(stringArr[1])
          if (stringArr.length >= 3) height = parseInt(stringArr[2])
          else height = parseInt(stringArr[1])
        }

        if (this.mesh.startsWith('defaultRectangle')) {
          this._points = [
            
          ]
        }
      }
    } else if (this.mesh.length > 0) {
      // Load as mesh collider
    } else {
      // Error
    }
  },
  get mesh() {
    return this._mesh
  }
})
