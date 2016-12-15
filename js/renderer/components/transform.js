// transform.js
// 13 November 2016
// Ravern Koh
// Transform (default component)
'use strict'

const Component = require('../component.js')

Component('Transform', {
  init: function() {
    // Assign common attributes of transform
    if (this.position == undefined) this.position = { x: 0, y: 0 }
    if (this.rotation == undefined) this.rotation = 0
    if (this.scale == undefined) this.scale = { x: 1, y: 1 }

    // Convenience var
    this._parentTransform = this.entity._parent[Object.keys(this.entity._parent)[0]].component('Transform')

    // Assign private attributes
    this._updateAttribs()
  },
  update: function() {
    this._updateAttribs()
    console.log(this._actualPosition)
  },
  _updateAttribs: function() {
    if (this.entity._id == Object.keys(this.entity._parent)[0]) {
      // Root entity
      this._actualPosition = { x: this.position.x, y: this.position.y }
      this._actualRotation = this.rotation
      this._actualScale = { x: this.scale.x, y: this.scale.y }
    } else {
      // Calculate position
      const x1 = this.position.x
      const y1 = this.position.y
      const x2 = x1 * Math.cos(this._parentTransform._actualRotation) - y1 * Math.sin(this._parentTransform._actualRotation)
      const y2 = x1 * Math.sin(this._parentTransform._actualRotation) + y1 * Math.cos(this._parentTransform._actualRotation)

      this._actualPosition = { x: x2 + this._parentTransform._actualPosition.x, y: y2 + this._parentTransform._actualPosition.y }
      this._actualRotation = this._parentTransform._actualRotation + this.rotation
      this._actualScale = { x: this._parentTransform._actualScale.x * this.scale.x, y: this._parentTransform._actualScale.y * this.scale.y }
    }
  }
})
