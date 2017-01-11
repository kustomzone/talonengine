// Collider.js
// 6 January 2017
// Ravern Koh
// Collider (built-in component)
'use strict'

/*
NOTES
1. Read in points and flatten using getPointAtLength()
2. Check if concave
3. If concave, triangulate using earclipping
4. Use SAT collision to detect collisions

** Shape definition use index of points, not points themselves
*/

const Talon = require('talonengine')

Talon.Component('Collider', {

  // Default atttributes
  _layer: 'main',
  _mesh: 'defaultRectangle 100 100',
  _colliding: {},
  _anchorPoint: { x: 0.5, y: 0.5 },

  // Override
  init: function() {

  },
  update: function() {
    this.updatePoints()
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
    this.updateLocalPoints()
  },
  get mesh() {
    return this._mesh
  },
  set anchorPoint(value) {
    this._anchorPoint = value
    this.updateLocalPoints()
  },
  get anchorPoint() {
    return this._anchorPoint
  },

  // Methods
  updateLocalPoints: function() {
    // Updates local points according to mesh and anchorPoint
    if (this.mesh == 'auto') {
      // Load mesh from Renderer
    } else if (this.mesh.startsWith('default')) {
      // Load as primitive collider
      const stringArr = this.mesh.split(' ')
      if (this.mesh.startsWith('defaultRectangle') || this.mesh.startsWith('defaultEllipse')) {
        // Rectangle & Circle

        // More default attributes
        this._width = 100
        this._height = 100

        if (stringArr.length >= 2) {
          this._width = parseInt(stringArr[1])
          if (stringArr.length >= 3) this._height = parseInt(stringArr[2])
          else this._height = parseInt(stringArr[1])
        }

        if (this.mesh.startsWith('defaultRectangle')) {
          this._localPoints = [
            { x: -this._width * this.anchorPoint.x, y: -this._height * this.anchorPoint.y },
            { x: this._width * (1 - this.anchorPoint.x), y: -this._height * this.anchorPoint.y },
            { x: this._width * (1 - this.anchorPoint.x), y: this._height * (1 - this.anchorPoint.y) },
            { x: -this._width * this.anchorPoint.x, y: this._height * (1 - this.anchorPoint.y) }
          ]
        } else {
          let precision = 8
          // Do ellipse loading
          if (stringArr.length >= 4) {
            precision = parseInt(stringArr[3])
            if (precision < 3) precision = 3
          }

          const getEllipsePoint = function(rot, self) {
            const point = {}
            let multiplier = 1
            if (rot < Math.PI / 2 || rot > Math.PI * 1.5) multiplier = -1
            point.x = multiplier * (self._width / 2 * self._height / 2) / (Math.sqrt(self._height / 2 * self._height / 2 + self._width / 2 * self._width / 2 * Math.tan(rot) * Math.tan(rot)))
            point.y = point.x * Math.tan(rot)
            point.x += self._width * (0.5 - self.anchorPoint.x)
            point.y += self._height * (0.5 - self.anchorPoint.y)

            return point
          }

          this._localPoints = []
          for (let rot = 0; rot < Math.PI * 2; rot += Math.PI * 2 / precision) {
            this._localPoints.push(getEllipsePoint(rot, this))
          }
        }
      }
    } else if (this.mesh.length > 0) {
      // Load as mesh collider
    } else {
      // Error
    }
  },
  updatePoints: function() {
    const rotate = function(point, self) {
      let newPoint = {}
      const rot = self.transform.rotation
      newPoint.x = point.x * Math.cos(rot * Math.PI / 180) - point.y * Math.sin(rot * Math.PI / 180)
      newPoint.y = point.y * Math.cos(rot * Math.PI / 180) + point.x * Math.sin(rot * Math.PI / 180)
      return newPoint
    }
    const scale = function(point, self) {
      // Assumes origin is anchor point
      let newPoint = {}
      const scale = self.transform.scale
      newPoint.x = point.x * scale.x
      newPoint.y = point.y * scale.y
      return newPoint
    }
    const translate = function(point, self) {
      let newPoint = {}
      const trans = self.transform.position
      newPoint.x = point.x + trans.x
      newPoint.y = point.y + trans.y
      return newPoint
    }

    const localPoints = this._localPoints
    const width = this._width
    const height = this._height
    let points = []
    for (var i = 0; i < localPoints.length; i++) {
      let point = translate(scale(rotate(localPoints[i], this), this), this)
      points.push(point)
    }
  }
})
