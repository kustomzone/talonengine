// scene.js
// 5 November 2016
// Ravern Koh
// Talon.Scene
'use strict'

// Main Scene function
let Scene = (init) => {
  // Scene pseudo-prototype
  let defaultScene = {
    _present: () => {
      if (this.present != undefined) this.present()
    }
  }

  // Call initialize, with 'this' as 'defaultScene'
  init.call(defaultScene)
}

// Export the Scene module
module.exports = Scene
