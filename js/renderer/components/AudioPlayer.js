// AudioPlayer.js
// 6 January 2017
// Ravern Koh
// AudioPlayer (built-in component)
'use strict'

const Talon = require('talonengine')

Talon.Component('AudioPlayer', {

  // Default attributes
  sounds: [],

  // Overrides
  init: function() {
    for (let i = 0; i < this.sounds.length; i++) {
      const sound = this.sounds[i]
      let resources = Talon._options.realResources
      for (let key in resources) {
        const resource = resources[key]
        if (resource.endsWith(sound + '.wav')) {
          const elem = document.createElement('audio')
          elem.id = this.entity.id + sound
          elem.src = resource
          document.getElementById('audios').appendChild(elem)
          // FOR NOW, MUST IMPROVE UTIL.MERGE
          if (this._elems == undefined) this._elems = []
          this._elems.push(elem)
        }
      }
    }
  },

  // Methods
  volume: function(sound, volume) {
    this._elems[sound].volume = volume
  },
  play: function(sound) {
    for (let key in this._elems) {
      const elem = this._elems[key]
      if (elem.src.endsWith(sound + '.wav')) {
        elem.load()
        elem.play()
        break
      }
    }
  },
  stop: function(sound) {
    if (sound == undefined) {
      for (let key in this._elems) {
        this._elems[key].load()
      }
    }
    else {
      for (let key in this._elems) {
        const elem = this._elems[key]
        if (elem.src.endsWith(sound + '.wav')) {
          elem.load()
          break
        }
      }
    }
  }
})
