// component.js
// 6 November 2016
// Ravern Koh
// Talon.Component
'use strict'

// Importing util lib
const util = require('../util.js')

// Global components array
const components = {}

// Default Component object
const defaultComponent = {
  static: {}
}

// Main Component function
const Component = function(name, component) {
  components[name] = util.merge(defaultComponent, component)
}

Component._Instantiate = function(name) {
  let newComponent = util.merge(components[name], {})
  newComponent.static = components[name].static
  return newComponent
}

// Export the Component module
module.exports = Component
