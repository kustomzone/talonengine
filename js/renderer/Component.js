// Component.js
// 6 November 2016
// Ravern Koh
// Talon.Component
'use strict'

// Importing util lib
const util = require('talonengine')._util

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
  },

  // Utility
  getEntityById: function() {}
}

// Main Component function
const Component = function(name, component) {
  components[name] = util.merge(defaultComponent, component, ['_static'])
}

Component._Instantiate = function(name) {
  let newComponent = util.merge(components[name], ['_static'])
  return newComponent
}

// Export the Component module
module.exports = Component
