// main.js
// 6 November 2016
// Ravern Koh
// Main file for renderer process
'use strict'

// Requiring essentials
const {app, ipcRenderer} = require('electron')


// Global Talon object
const Talon = {}
module.exports = Talon


// Init code
Talon._options = ipcRenderer.sendSync('start')


// Requiring Talon submodules
Talon.Scene = require('./scene.js')
