// main.js
// 5 November 2016
// Ravern Koh
// Main file for main process
'use strict'

// Requiring essentials
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const util = require('../util.js')


/** @module Talon - Main process */
const Talon = {}
module.exports = Talon

/**
  * @function on
  * @desc Performs the callback when an event of the corresponding name occurs.
  * @param {string} name - Name of the event.
  * @param {function} callback - The callback to be performed.
  * @instance
*/
Talon.on = function(name, callback) {
  if (Talon.on[name] != undefined) Talon.on[name].push(callback)
}
Talon.on['ready'] = []
Talon._on = function(name) {
  // Calls all callbacks for event 'name'
  if (Talon.on[name] != undefined) for (let i = 0; i < Talon.on[name].length; i++) Talon.on[name][i]()
}

/**
  * @function configure
  * @desc Configures Talon to run with the options provided.
  * @param {string} options - Options for Talon.
  * @instance
*/
Talon.configure = function(options) {
  Talon._options = util.merge(Talon._options, options)
  // Set CWD + main script name in realScript
  Talon._options.realScript = path.dirname(require.main.filename) + '/' + Talon._options.script
}
Talon._options = {
  script: 'js/index.js',
  window: {
    width: 800,
    aspect: 4 / 3,
    resizable: false
  }
}

/**
  * @function createWindow
  * @desc Creates the window and passes on options to the renderer process.
  * @param {string} options - Options provided by configure.
  * @private
  * @instance
*/
Talon._createWindow = function(options) {
  // Creating window
  Talon._window = new BrowserWindow({ width: options.width, height: options.width / options.aspect, resizable: options.resizable })
  Talon._window.loadURL(url.format({
    pathname: path.join(__dirname, '../../html/main.html'),
    protocol: 'file:',
    slashes: true
  }))
  Talon._window.on('closed', function() {
    Talon._window = null
  })

  // On renderer ready
  ipcMain.on('start', function(event) {
    event.returnValue = Talon._options
  })

  // /* FOR DEBUG */ Talon._window.webContents.openDevTools()
}

/**
  * @function start
  * @desc Called by the user to start the game by creating the window
  * @instance
*/
Talon.start = function() {
  Talon._createWindow(Talon._options.window)
}


// Wait for app to be ready
app.on('ready', function() {
  Talon._on('ready')
})

// When window is closed, quit the app
app.on('window-all-closed', function() {
  app.quit()
})
