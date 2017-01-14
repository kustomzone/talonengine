// main.js
// 6 November 2016
// Ravern Koh
// Main file for renderer process
'use strict'

// Requiring essentials
const {app, ipcRenderer} = require('electron')
const path = require('path')


// Global Talon object
const Talon = {}
module.exports = Talon


// Init code, loading '_options'/configuration
Talon._options = ipcRenderer.sendSync('start')

// Add in black box
// require('./screen.js')

// Requiring Talon submodules
Talon._util = require('../util.js')
Talon.Component = require('./Component.js')
Talon.Entity = require('./Entity.js')
Talon.Scene = require('./Scene.js')
Talon.Time = require('./Time.js')
Talon.Input = require('./Input.js')


// Include standard assets
require('./components/Root.js')
require('./components/Transform.js')
require('./components/Camera.js')
require('./components/Renderer.js')
require('./components/AudioPlayer.js')
require('./components/Collider.js')

require('./entities/Root.js')
require('./entities/DefaultCamera.js')

// Requiring main user file
require(Talon._options.realScript)
