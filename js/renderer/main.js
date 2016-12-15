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


// Requiring Talon submodules
Talon.Component = require('./component.js')
Talon.Entity = require('./entity.js')
Talon.Scene = require('./scene.js')

// Include standard assets
require('./components/root.js')
require('./components/renderer.js')
require('./components/transform.js')

require('./entities/root.js')

// Requiring main user file
require(Talon._options.realScript)
