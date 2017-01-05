// root.js
// 12 November 2016
// Ravern Koh
// Root (default component)
'use strict'

const Component = require('../component.js')

Component('__Root', {
  init: function() {
    setInterval(this._update.bind(this), 1000 / 60)
  },
  update: function() {
    const _update = function(entity) {
      for (let key in entity._components) {
        if (key != '__Root') entity._components[key]._update()
      }
      for (let key in entity._children) {
        _update(entity._children[key])
      }
    }

    _update(this.entity)
  }
})
