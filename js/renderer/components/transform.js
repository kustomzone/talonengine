// transform.js
// 13 November 2016
// Ravern Koh
// Transform (default component)
'use strict'

const Component = require('../component.js')

Component('Transform', {
  init: function() {
    // Assign common attributes of transform
    this.position = { x: 0, y: 0 }
    this.rotation = 0
    this.scale = { x: 1, y: 1 }

    // Assign private attributes
    // this._actualPosition
  },
  update: function() {

  }
})
