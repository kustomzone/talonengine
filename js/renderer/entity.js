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
  _id: null, // Unique id for each entity
  _components: {}, // Entity-component paradigm
  _parent: null, // Parent-child paradigm
  _children: {}, // Parent-child paradigm

  // Getters and setters
  get id() {
    return this._id
  },
  get parent() {
    return this._parent
  },
  get children() {
    return this._children
  },

  // Methods
  component: function(name) {
    return this._components[name]
  },
  add: function(name, id, params, setupFunction) {
    Entity._Instantiate(name, id, this, params, setupFunction)
  },
  remove: function(id) {
    _children[id] = undefined
  }
}

// Main Entity function
const Entity = function(name, componentNames) {
  componentNames.push('Transform')

  let newEntity = util.merge(defaultEntity)
  for (let i = 0; i < componentNames.length; i++) {
    newEntity._components[componentNames[i]] = Component._Instantiate(componentNames[i])
  }

  entities[name] = newEntity
}

Entity._Instantiate = function(name, id, parent, params, setupFunction) {
  let newEntity = util.merge(entities[name])

  // Assigning common variables
  for (let key in newEntity._components) {
    // Assign to 'entity' attribute of all components
    newEntity._components[key].entity = newEntity
    newEntity._components[key].transform = newEntity.component('Transform')
    // Assign to '_static' attribute of all components
    newEntity._components[key]._static = entities[name]._components[key]._static
  }

  // Assign the parent of the newChild
  newEntity._id = id
  if (parent == null) {
    newEntity._parent = newEntity
  }
  else {
    parent._children[id] = newEntity
    newEntity._parent = parent
  }

  // TODO make this a single input method

  for (let key in params) {
    // params[key] is the dict of the component attributes
    for (let key2 in params[key]) {
      newEntity._components[key][key2] = params[key][key2]
    }
  }

  for (let key in newEntity._components) {
    // Call init function of all the components
    newEntity._components[key]._init()
  }

  // Setup should come after _init()
  if (setupFunction != undefined) setupFunction.call(newEntity)
  // END TODO

  return newEntity
}

// Export the Entity module
module.exports = Entity
