// screen.js
// 7 January 2017
// Ravern Koh
// Screen config
'use strict'

const Talon = require('talonengine')

const screen = function() {
  const winWidth = window.innerWidth
  const winHeight = window.innerHeight
  const winAspect = winWidth / winHeight

  const gameWidth = Talon._options.window.width
  const gameAspect = Talon._options.window.aspect
  const gameHeight = Talon._options.window.width / gameAspect

  const canvas = document.getElementById('canvas')
  const gl = canvas.getContext('webgl')
  gl.canvas.width = winWidth
  gl.canvas.height = winHeight

  let scale

  if (winAspect > gameAspect) {
    // Too wide
    scale = winHeight / gameHeight
    const rectWidth = (winWidth - gameWidth * scale) / 2
    gl.viewport(rectWidth, 0, winWidth - rectWidth * 2, winHeight)
  }
  else {
    // Too tall
    scale = winWidth / gameWidth
    const rectHeight = (winHeight - gameHeight * scale) / 2
    gl.viewport(0, rectHeight, winWidth, winHeight - rectHeight * 2)
  }
}
window.addEventListener('resize', screen)
screen()
