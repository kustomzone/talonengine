// Time.js
// 10 January 2016
// Ravern Koh
// Talon.Time
'use strict'

const Time = {}
module.exports = Time

let prevTime = window.performance.now()
let deltaTime = 0

Time._update = function() {
  const nowTime = window.performance.now()
  deltaTime = (nowTime - prevTime) / 1000
  prevTime = nowTime
}

Time.delta = function() {
  return deltaTime
}
