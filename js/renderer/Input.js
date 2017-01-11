// Input.js
// 6 January 2016
// Ravern Koh
// Talon.Input
'use strict'

const Input = {}
module.exports = Input

const keysDown = []

const keyDownCallback = function(event) {
  const keyPressed = String.fromCharCode(event.keyCode)
  if (keysDown.indexOf(keyPressed) == -1) {
    keysDown.push(keyPressed)
  }
}

const keyUpCallback = function(event) {
  const keyPressed = String.fromCharCode(event.keyCode)
  keysDown.splice(keyPressed, 1)
}

document.addEventListener('keyup', keyUpCallback)
document.addEventListener('keydown', keyDownCallback)

Input.isKeyDown = function(key) {
  return keysDown.indexOf(key) != -1
}
