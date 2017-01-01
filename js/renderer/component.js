// component.js
// 6 November 2016
// Ravern Koh
// Talon.Component
'use strict'

// Importing util lib
const util = require('../util.js')

// Global components array
const components = {}

const defaultComponent = {
  _static: {},
  entity: null,
  init: function() {},
  update: function() {},
  _init: function() {
    if (this.init != undefined) this.init()
  },
  _update: function() {
    if (this.update != undefined) this.update()
  }
}

/**
  * @function module:Talon - Renderer process.Component
  * @param {string} name - The name of the component being created.
  * @param {string} component - The implementation of the component.
  * @instance
*/
const Component = function(name, component) {
  components[name] = util.merge(defaultComponent, component)
}

Component._Instantiate = function(name) {
  let newComponent = util.merge(components[name])
  return newComponent
}

// Export the Component module
module.exports = Component
