// renderer.js
// 13 November 2016
// Ravern Koh
// Renderer (built-in component)
'use strict'

const Talon = require('talonengine')

Talon.Component('Renderer', {

  // Default attributes
  _mesh: 'defaultRectangle 100 100 white black 1',
  anchorPoint: { x: 0, y: 0 },


  // Override
  init: function() {
    this.mesh = this.mesh

    const mainGroup = document.getElementById('mainGroup')
    mainGroup.appendChild(this._elem)
  },
  update: function() {
    console.log(this.anchorPoint)
    const transformString = this._generateTransformString()
    this._elem.setAttribute('transform', transformString)
  },


  // Getters and setters
  set mesh(value) {
    this._mesh = value
    if (this.mesh.startsWith('default')) {
      const stringArr = this.mesh.split(' ')

      if (this._elem == undefined || this._elem.nodeName != 'path') {
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
        this._width = 100
        this._height = 100

        if (stringArr.length >= 2) {
          this._width = parseInt(stringArr[1])
          if (stringArr.length >= 3) this._height = parseInt(stringArr[2])
          else this._height = parseInt(stringArr[1])
        }

        if (this.mesh.startsWith('defaultRectangle')) this._elem.setAttribute('d', 'M0 0 ' + 'L' + this._width + ' 0 ' + 'L' + this._width + ' ' + this._height + ' ' + 'L0 ' + this._height + ' Z')
        else this._elem.setAttribute('d', 'M0 ' + (this._height / 2) + ' a' + (this._width / 2) + ' ' + (this._height / 2) + ' 0 1 0 ' + this._width + ' 0 a' + (this._width / 2) + ' ' + (this._height / 2) + ' 0 1 0 -' + this._width + ' 0')

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
    }
    else {
      // Use svg from external file with id 'this.mesh'
      if (this._elem == undefined || this._elem.nodeName != 'use') {
        this._elem = document.createElementNS('http://www.w3.org/2000/svg', 'use')
      }

      const stringArr = this.mesh.split(' ')

      const resources = Talon._options.realResources
      let foundSvg = false
      for (let key in resources) {
        const resource = Talon._options.realResources[key]
        if (resource.endsWith(stringArr[0] + '.svg')) {
          foundSvg = true
          this._elem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', resource + '#' + stringArr[0])
          break
        }
      }
      if (foundSvg == false) {
        // Handle resource not found error
      }

      if (stringArr.length >= 2) {
        this._width = parseInt(stringArr[1])
        if (stringArr.length >= 3) this._height = parseInt(stringArr[2])
        else this._height = parseInt(stringArr[1])
      }
    }
  },
  get mesh() {
    return this._mesh
  },

  // Methods
  _generateTransformString: function() {
    let transformString = ''

    // Translating
    transformString += 'translate('
    transformString += (this.transform.position.x - this._width * this.anchorPoint.x) + ', ' + (this.transform.position.y - this._height * this.anchorPoint.y) + ') '

    // Rotating
    transformString += 'rotate('
    transformString += this.transform.rotation + ', ' + this._width * this.anchorPoint.x + ', ' + this._height * this.anchorPoint.y + ') '

    // Scaling
    transformString += 'translate('
    transformString += this._width * this.anchorPoint.x + ', ' + this._height * this.anchorPoint.y + ') '
    transformString += 'scale('
    transformString += this.transform.scale.x + ', ' + this.transform.scale.y + ') '
    transformString += 'translate('
    transformString += -this._width * this.anchorPoint.x + ', ' + -this._height * this.anchorPoint.y + ') '

    return transformString
  }
})
