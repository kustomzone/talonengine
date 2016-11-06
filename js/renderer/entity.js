// entity.js
// 5 November 2016
// Ravern Koh
// Talon.Entity
'use strict'

// Importing Component module
const Component = require('./component.js')

// Global entities array
const entities = {}

// Default Entity object
const defaultEntity = {
  _components: {},
  component: function(name) {
    return this._components[name]
  }
}

// Main Entity function
const Entity = function(name, componentNames) {
  let newEntity = Object.create(defaultEntity)
  for (let i = 0; i < componentNames.length; i++) {
    newEntity._components[componentNames[i]] = Component._Instantiate(componentNames[i])
  }

  entities[name] = newEntity
}

Entity.Instantiate = function(name, setupFunction) {
  let newEntity = Object.create(entities[name])
  setupFunction(newEntity)
  return newEntity
}

// Export the Entity module
module.exports = Entity
