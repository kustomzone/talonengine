// renderer.js
// 13 November 2016
// Ravern Koh
// Renderer (built-in component)
'use strict'

const Component = require('../component.js')
const util = require('../../util.js')

Component('Renderer', {
  init: function() {
    if (this.static.notFirst == undefined) {
      // First time setup
      this.static.notFirst = true
      this.static.svgElem = document.getElementById('canvas')
      this.static.elems = {}
    }

    const svgElem = this.static.svgElem
    // Create the graphics for this renderer component
    if (this.mesh == undefined) util.logwarn('Mesh is undefined.') // TODO make more comprehensive
    else this._createElem(this.mesh)
  },

  update: function() {

  },

  _createElem: function(mesh) {
    // Create the graphics for renderer component
    var uuid
    while (this.static.elems[(uuid = (Math.random() * 10000))] != undefined) {}

    if (mesh._primitive) {
      const elem = document.createElement('path')
      this.static.elems[uuid] = elem
      this.static.svgElem.appendChild(elem)
    } else {

    }

    return elem
  },
})
