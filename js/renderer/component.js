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

}

// Main Component function
const Component = function(name, component) {
  components[name] = util.merge(defaultComponent, component)
}

Component._Instantiate = function(name) {
  return Object.create(components[name])
}

// Export the Component module
module.exports = Component
