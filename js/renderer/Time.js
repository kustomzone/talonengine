// Time.js
// 10 January 2016
// Ravern Koh
// Talon.Time
'use strict'

const Time = {}
module.exports = Time

let prevTime = Date.now()
let deltaTime = 0

Time._update = function() {
  const nowTime = Date.now()
  deltaTime = (nowTime - prevTime) / 1000
  prevTime = nowTime
}

Time.delta = function() {
  return deltaTime
}
