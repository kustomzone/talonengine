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
  _localPoints: [],
  _points: [],
  _shapeIndices: [],
  _curShapeIndex: 0,

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
    // Check if mesh is auto, if auto, take renderer mesh and use as own, without changing this.mesh
    this._localPoints = []
    let mesh = (this.mesh == 'auto') ? this.entity.component('Renderer').mesh : this.mesh
    const stringArr = mesh.split(' ')

    if (mesh.startsWith('default')) {
      // Load as primitive collider
      if (mesh.startsWith('defaultRectangle') || mesh.startsWith('defaultEllipse')) {
        // Rectangle & Circle

        // More default attributes
        this._width = 100
        this._height = 100

        if (stringArr.length >= 2) {
          this._width = parseInt(stringArr[1])
          if (stringArr.length >= 3) this._height = parseInt(stringArr[2])
          else this._height = parseInt(stringArr[1])
        }

        if (mesh.startsWith('defaultRectangle')) {
          this._localPoints = [
            { x: -this._width * this.anchorPoint.x, y: -this._height * this.anchorPoint.y },
            { x: this._width * (1 - this.anchorPoint.x), y: -this._height * this.anchorPoint.y },
            { x: this._width * (1 - this.anchorPoint.x), y: this._height * (1 - this.anchorPoint.y) },
            { x: -this._width * this.anchorPoint.x, y: this._height * (1 - this.anchorPoint.y) }
          ]
          this._shapeIndices = [ 0, 0, 0, 0 ]
        }
        else {
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

          for (let rot = 0; rot < Math.PI * 2; rot += Math.PI * 2 / precision) {
            this._localPoints.push(getEllipsePoint(rot, this))
            this._shapeIndices.push(0)
          }
        }
      }
    }
    else {
      // Load as collider for renderer
      const resources = Talon._options.realResources
      let foundSvg = false
      for (let key in resources) {
        const resource = resources[key]
        if (resource.endsWith(stringArr[0] + '.svg')) {
          foundSvg = true
          const elem = document.createElement('object')
          elem.setAttribute('data', resource)
          document.documentElement.appendChild(elem)
          // When SVG loads into object
          const self = this
          elem.addEventListener('load', function() {
            load.call(self)
          })
          const load = function() {
            // Load path from SVG
            const elemDocument = elem.contentDocument
            const svgElem = elemDocument.getElementById(stringArr[0])

            const loadNodes = function(elem) {
              for (let i = 0; i < elem.children.length; i++) {
                const child = elem.children[i]
                const tag = child.tagName
                if (tag == 'g') {
                  loadNodes.call(this, child)
                }
                else {
                  // Do loading of paths or primitives here
                  if (tag == 'rect') {
                    // Get attributes here
                    const x = parseFloat(child.getAttribute('x'))
                    const y = parseFloat(child.getAttribute('y'))
                    const width = parseFloat(child.getAttribute('width'))
                    const height = parseFloat(child.getAttribute('height'))
                    let transform = child.getAttribute('transform')
                    const fill = child.getAttribute('fill')

                    // Get points before transformation
                    const points = [
                      { x: x, y: y },
                      { x: x + width, y: y },
                      { x: x + width, y: y + height },
                      { x: x, y: y + height },
                    ]

                    // Get matrix
                    const matrix = []
                    transform = transform.substr(0, transform.length - 1).substr(7)
                    const elemArr = transform.split(' ')
                    for (let i = 0; i < 9; i++) matrix.push(0)
                    matrix[0] = parseFloat(elemArr[0]); matrix[1] = parseFloat(elemArr[2]); matrix[2] = parseFloat(elemArr[4]); matrix[3] = parseFloat(elemArr[1]); matrix[4] = parseFloat(elemArr[3]); matrix[5] = parseFloat(elemArr[5]); matrix[8] = 1

                    // Applies the matrix to the point
                    const applyMat = function(point, matrix) {
                      const x = matrix[0] * point.x + matrix[1] * point.y + matrix[2]
                      const y = matrix[3] * point.x + matrix[4] * point.y + matrix[5]
                      return { x: x, y: y }
                    }
                    for (let i = 0; i < points.length; i++) {
                      points[i] = applyMat(points[i], matrix)
                      this._localPoints.push(points[i])
                      this._shapeIndices.push(this._curShapeIndex)
                    }

                    this._curShapeIndex++
                  }
                  else if (tag == 'polygon') {
                    
                  }
                }
              }
            }

            // Start to load children of SVG
            loadNodes.call(this, svgElem)

            document.documentElement.removeChild(elem)
          }
          break
        }
      }
      if (foundSvg == false) {
        // Handle resource not found error

      }
    }
  },
  updatePoints: function() {
    const rotate = function(point) {
      let newPoint = {}
      const rot = this.transform.rotation
      newPoint.x = point.x * Math.cos(rot * Math.PI / 180) - point.y * Math.sin(rot * Math.PI / 180)
      newPoint.y = point.y * Math.cos(rot * Math.PI / 180) + point.x * Math.sin(rot * Math.PI / 180)
      return newPoint
    }
    const scale = function(point) {
      // Assumes origin is anchor point
      let newPoint = {}
      const scale = this.transform.scale
      newPoint.x = point.x * scale.x
      newPoint.y = point.y * scale.y
      return newPoint
    }
    const translate = function(point) {
      let newPoint = {}
      const trans = this.transform.position
      newPoint.x = point.x + trans.x
      newPoint.y = point.y + trans.y
      return newPoint
    }

    const localPoints = this._localPoints
    const width = this._width
    const height = this._height
    let points = []
    for (var i = 0; i < localPoints.length; i++) {
      let point = translate.call(this, scale.call(this, rotate.call(this, localPoints[i])))
      points.push(point)
    }
  }
})
