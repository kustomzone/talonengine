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


// Global Talon object
const Talon = {}
module.exports = Talon

// Event callers
Talon.on = (name, callback) => {
  if (Talon.on[name] != undefined) Talon.on[name].push(callback)
}
Talon.on['ready'] = []
Talon._on = (name) => {
  // Calls all callbacks for event 'name'
  if (Talon.on[name] != undefined) for (let i = 0; i < Talon.on[name].length; i++) Talon.on[name][i]()
}

Talon.configure = (options) => {
  Talon._options = util.merge(Talon._options, options)
}
Talon._options = {
  script: 'js/index.js',
  window: {
    width: 800,
    aspect: 4 / 3,
    resizable: false
  }
}

Talon._createWindow = (options) => {
  // Creating window
  Talon._window = new BrowserWindow({ width: options.width, height: options.width / options.aspect, resizable: options.resizable, 'web-preferences': { 'web-security': false } })
  Talon._window.loadURL(url.format({
    pathname: path.join(__dirname, '../../html/main.html'),
    protocol: 'file:',
    slashes: true
  }))
  Talon._window.on('closed', () => {
    Talon._window = null
  })

  // On renderer ready
  ipcMain.on('start', (event) => {
    event.returnValue = Talon._options
  })

  /* FOR DEBUG */ Talon._window.webContents.openDevTools()
}

Talon.start = () => {
  Talon._createWindow(Talon._options.window)
}


// Wait for app to be ready
app.on('ready', () => {
  Talon._on('ready')
})

// When window is closed, quit the app
app.on('window-all-closed', () => {
  app.quit()
})
