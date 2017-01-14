// Transform.js
// 13 November 2016
// Ravern Koh
// Transform (default component)
'use strict'

const Talon = require('talonengine')

Talon.Component('Transform', {

  // Default attributes
  // Local
  _localPosition: { x: 0, y: 0 },
  _localRotation: 0,
  _localScale: { x: 1, y: 1 },
  // Absolute
  _position: { x: 0, y: 0 },
  _rotation: 0,
  _scale: { x: 1, y: 1 },


  // Override methods
  init: function() {
    // To refresh the getters and setters
    this.localPosition = this.localPosition
    this.localRotation = this.localRotation
    this.localScale = this.localScale
  },
  update: function() {},


  // Getters and Setters
  set localPosition(value) {
    this._localPosition = value
    if (this._parentTransform == undefined) this._parentTransform = this.entity.parent.component('Transform')
    if (this._isRoot == undefined) this._isRoot = this.entity._id == 'root'
    if (this._isRoot == true) this._position = this.localPosition
    else {
      const rot = this._parentTransform.rotation
      const x2 = this.localPosition.x * Math.cos(rot * Math.PI / 180) - this.localPosition.y * Math.sin(rot * Math.PI / 180)
      const y2 = this.localPosition.x * Math.sin(rot * Math.PI / 180) + this.localPosition.y * Math.cos(rot * Math.PI / 180)
      this._position = { x: x2 + this._parentTransform.position.x, y: y2 + this._parentTransform.position.y }
    }
    this._updateChildren()
  },
  get localPosition() {
    return this._localPosition
  },
  set localRotation(value) {
    this._localRotation = value
    if (this._parentTransform == undefined) this._parentTransform = this.entity.parent.component('Transform')
    if (this._isRoot == undefined) this._isRoot = this.entity._id == 'root'
    if (this._isRoot == true) this._rotation = this.localRotation
    else this._rotation = this._parentTransform.rotation + this.localRotation
    this._updateChildren()
  },
  get localRotation() {
    return this._localRotation
  },
  set localScale(value) {
    this._localScale = value
    if (this._parentTransform == undefined) this._parentTransform = this.entity.parent.component('Transform')
    if (this._isRoot == undefined) this._isRoot = this.entity._id == 'root'
    if (this._isRoot == true) this._scale = this.localScale
    else this._scale = { x: this._parentTransform.scale.x * this.localScale.x, y: this._parentTransform.scale.y * this.localScale.y }
    this._updateChildren()
  },
  get localScale() {
    return this._localScale
  },
  set position(value) {
    this._position = value
    if (this._parentTransform == undefined) this._parentTransform = this.entity.parent.component('Transform')
    if (this._isRoot == undefined) this._isRoot = this.entity._id == 'root'
    if (this._isRoot == true) this._localPosition = this.position
    else {
      const rot = this._parentTransform.rotation
      const x1 = this.position.x - this._parentTransform.position.x
      const y1 = this.position.y - this._parentTransform.position.y
      const x2 = x1 * Math.cos(-rot * Math.PI / 180) - y1 * Math.sin(-rot * Math.PI / 180)
      const y2 = x1 * Math.sin(-rot * Math.PI / 180) + y1 * Math.cos(-rot * Math.PI / 180)
      this._localPosition = { x: x2 + this._parentTransform.position.x, y: y2 + this._parentTransform.position.y }
    }
    this._updateChildren()
  },
  get position() {
    return this._position
  },
  set rotation(value) {
    this._rotation = value
    if (this._parentTransform == undefined) this._parentTransform = this.entity.parent.component('Transform')
    if (this._isRoot == undefined) this._isRoot = this.entity._id == 'root'
    if (this._isRoot == true) this._localRotation = this.rotation
    else this._localRotation = this.rotation - this._parentTransform.rotation
    this._updateChildren()
  },
  get rotation() {
    return this._rotation
  },
  set scale(value) {
    this._scale = value
    if (this._parentTransform == undefined) this._parentTransform = this.entity.parent.component('Transform')
    if (this._isRoot == undefined) this._isRoot = this.entity._id == 'root'
    if (this._isRoot == true) this._localScale = this.scale
    else this._localScale = { x: this.scale.x / this._parentTransform.scale.x, y: this.scale.y / this._parentTransform.scale.y }
    this._updateChildren()
  },
  get scale() {
    return this._scale
  },


  // Methods
  _updateChildren: function() {
    for (let key in this.entity._children) {
      const childTransform = this.entity._children[key].component('Transform')
      childTransform.localPosition = childTransform.localPosition
      childTransform.localRotation = childTransform.localRotation
      childTransform.localScale = childTransform.localScale
    }
  }
})
