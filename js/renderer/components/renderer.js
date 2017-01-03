// renderer.js
// 13 November 2016
// Ravern Koh
// Renderer (built-in component)
'use strict'

const Component = require('../component.js')
const fs = require('fs')

Component('Renderer', {

  // Default attributes
  _mesh: 'defaultRectangle 100 100 white black 1',
  anchorPoint: { x: 0, y: 0 },
  _centerAnchorPoint: {},


  // Override
  init: function() {
    this.mesh = this.mesh

    const mainGroup = document.getElementById('mainGroup')
    mainGroup.appendChild(this._elem)
  },
  update: function() {
    const transformString = this._generateTransformString()
    this._elem.setAttribute('transform', transformString)
  },


  // Getters and setters
  set mesh(value) {
    this._mesh = value
    if (this.mesh.startsWith('default')) {
      const stringArr = this.mesh.split(' ')

      if (this._elem == undefined) {
        this._elem = document.createElementNS('http://www.w3.org/2000/svg', 'path')

        // Setting default attributes
        this._elem.setAttribute('fill', 'white')
        this._elem.setAttribute('stroke', 'black')
        this._elem.setAttribute('stroke-width', '1')
      }

      // Set _centerAnchorPoint in here
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

        this._centerAnchorPoint = { x: width / 2, y: height / 2 }

        if (this.mesh.startsWith('defaultRectangle')) this._elem.setAttribute('d', 'M0 0 ' + 'L' + width + ' 0 ' + 'L' + width + ' ' + height + ' ' + 'L0 ' + height + ' Z')
        else this._elem.setAttribute('d', 'M0 ' + (height / 2) + ' a' + (width / 2) + ' ' + (height / 2) + ' 0 1 0 ' + width + ' 0 a' + (width / 2) + ' ' + (height / 2) + ' 0 1 0 -' + width + ' 0')

        if (stringArr.length >= 4) {
          this._elem.setAttribute('fill', stringArr[3])
          if (stringArr.length >= 5) {
            this._elem.setAttribute('stroke', stringArr[4])
            if (stringArr.length >= 6) {
              this._elem.setAttribute('stroke-width', stringArr[5])
            }
          }
        }
      }

      this.centerAnchorPoint()
    }
    else {
      // Use svg from external file with id 'this.mesh'

    }
  },
  get mesh() {
    return this._mesh
  },

  // Methods
  centerAnchorPoint: function() {
    this.anchorPoint = this._centerAnchorPoint
  },
  _generateTransformString: function() {
    let transformString = ''

    // Translating
    transformString += 'translate('
    transformString += (this.transform.position.x - this.anchorPoint.x) + ', ' + (this.transform.position.y - this.anchorPoint.y) + ') '

    // Rotating
    transformString += 'rotate('
    transformString += this.transform.rotation + ', ' + this.anchorPoint.x + ', ' + this.anchorPoint.y + ') '

    // Scaling
    transformString += 'translate('
    transformString += this.anchorPoint.x + ', ' + this.anchorPoint.y + ') '
    transformString += 'scale('
    transformString += this.transform.scale.x + ', ' + this.transform.scale.y + ') '
    transformString += 'translate('
    transformString += -this.anchorPoint.x + ', ' + -this.anchorPoint.y + ') '

    return transformString
  }
})
