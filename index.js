// index.js
// 5 November 2016
// Ravern Koh
// Entry point for talonengine
'use strict'

// Function to check if current process is renderer or main
const isRenderer = () => {
  // running in a web browser
  if (typeof process === 'undefined') return true
  // node-integration is disabled
  if (!process) return true
  // We're in node.js somehow
  if (!process.type) return false
  return process.type === 'renderer'
}

if (isRenderer()) module.exports = require('./js/renderer/main.js')
else module.exports = require('./js/main/main.js')
