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

  let scale
  let leftRect = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  leftRect.id = 'leftRect'
  let rightRect = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  rightRect.id = 'rightRect'
  const canvas = document.getElementById('canvas')
  canvas.removeChild(document.getElementById('leftRect'))
  canvas.removeChild(document.getElementById('rightRect'))
  canvas.appendChild(leftRect)
  canvas.appendChild(rightRect)

  if (winAspect > gameAspect) {
    // Too wide
    scale = winHeight / gameHeight
    const rectWidth = (winWidth - gameWidth * scale) / 2

    leftRect.setAttribute('d', 'M0 0 ' + 'L' + rectWidth + ' 0 ' + 'L' + rectWidth + ' ' + winHeight + ' ' + 'L0 ' + winHeight + ' Z')
    rightRect.setAttribute('d', 'M' + (winWidth - rectWidth) + ' 0 ' + 'L' + winWidth + ' 0 ' + 'L' + winWidth + ' ' + winHeight + ' ' + 'L' + (winWidth - rectWidth) + ' ' + winHeight + ' Z')
    document.getElementById('windowScaleGroup').setAttribute('transform', 'translate(' + rectWidth + ', 0) scale(' + scale + ', ' + scale + ')')
  } else {
    // Too tall
    scale = winWidth / gameWidth
    const rectHeight = (winHeight - gameHeight * scale) / 2

    leftRect.setAttribute('d', 'M0 0 ' + 'L' + winWidth + ' 0 ' + 'L' + winWidth + ' ' + rectHeight + ' ' + 'L0 ' + rectHeight + ' Z')
    rightRect.setAttribute('d', 'M0 ' + (winHeight - rectHeight) + ' L' + winWidth + ' ' + (winHeight - rectHeight) + ' L' + winWidth + ' ' + winHeight + ' ' + 'L0 ' + winHeight + ' Z')
    document.getElementById('windowScaleGroup').setAttribute('transform', 'translate(0, ' + rectHeight + ') scale(' + scale + ', ' + scale + ')')
  }
}
window.addEventListener('resize', screen)
screen()
