// entity.js
// 5 November 2016
// Ravern Koh
// Talon.Entity
'use strict'

// Importing Component module
const Component = require('./component.js')
const util = require('../util.js')

// Global entities array
const entities = {}

// Default Entity object
const defaultEntity = {
  // Unique id for each entity
  _id: null,
  // Entity-component paradigm
  _components: {},
  component: function(name) {
    return this._components[name]
  },
  // Parent-child paradigm
  _parent: {},
  _children: {},
  add: function(name, id, setupFunction) {
    const parent = this
    let newChild = Entity._Instantiate(name, setupFunction, function() {
      // Assign the parent of the newChild
      parent._children[id] = this
      parent._children[id]._id = id
      parent._children[id]._parent[parent._id] = parent
    })
  },
  remove: function(id) {
    _children[id] = undefined
  }
}

// Main Entity function
const Entity = function(name, componentNames) {
  componentNames.push('Transform')

  let newEntity = util.merge(defaultEntity, {})
  for (let i = 0; i < componentNames.length; i++) {
    newEntity._components[componentNames[i]] = Component._Instantiate(componentNames[i])
  }

  entities[name] = newEntity
}

Entity._Instantiate = function(name, setupFunction, _presetupFunction) {
  let newEntity = util.merge(entities[name], {})

  for (key in newEntity._components) {
    // Assign to 'entity' attribute of all components
    newEntity._components[key].entity = newEntity
    // Assign to 'static' attribute of all components
    newEntity._components[key].static = entities[name]._components[key].static
  }

  // PERHAPS CAN ADD AN INIT() AND A FIRSTUPDATE()
  _presetupFunction.call(newEntity)

  for (key in newEntity._components) {
    // Call init function of all the components
    newEntity._components[key]._init()
  }

  // Setup should come after _init()
  setupFunction.call(newEntity)

  return newEntity
}

// Export the Entity module
module.exports = Entity
