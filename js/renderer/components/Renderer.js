// Renderer.js
// 13 November 2016
// Ravern Koh
// Renderer (built-in component)
'use strict'

const Talon = require('talonengine')
const fs = require('fs')

Talon.Component('Renderer', {

  // Default attributes
  _mesh: 'defaultRectangle 100 100 white black 1',
  anchorPoint: { x: 0, y: 0 },


  // Override
  init: function() {

  },
  update: function() {
    // Convenience var
    const gl = this._static.gl
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  },


  // Getters and setters
  set mesh(value) {
    this._mesh = value
    if (this._static.notFirst == undefined) {
      this._static.notFirst = true
      // Do setup code
      const canvas = document.getElementById('canvas')
      this._static.gl = canvas.getContext('webgl')
      // Convenience var
      const gl = this._static.gl
      gl.clearColor(0, 0, 0, 1)

      const createProgram = function() {
        const createShader = function(type, source) {
          const shader = gl.createShader(type)
          gl.shaderSource(shader, source)
          gl.compileShader(shader)
          const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
          if (success) return shader

          // Log error
          console.log(gl.getShaderInfoLog(shader))
          gl.deleteShader(shader)
        }

        const createProgram = function(vert, frag) {
          const program = gl.createProgram()
          gl.attachShader(program, vert)
          gl.attachShader(program, frag)
          gl.linkProgram(program)
          const success = gl.getProgramParameter(program, gl.LINK_STATUS)
          if (success) return program

          console.log(gl.getProgramInfoLog(program))
          gl.deleteProgram(program)
        }

        // Get the source code
        const vertSource = document.getElementById('vertex').text
        const fragSource = document.getElementById('fragment').text

        // Compile source code
        const vert = createShader(gl.VERTEX_SHADER, vertSource)
        const frag = createShader(gl.FRAGMENT_SHADER, fragSource)

        const program = createProgram(vert, frag)

        gl.useProgram(program)
      }

      createProgram()
    }

    // Convenience var
    const gl = this._static.gl

    const attribLocation = gl.getAttribLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'a_position')
    const posBuff = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuff)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([ -1, -1, -1, 1, 1, 1 ]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(attribLocation)
    gl.vertexAttribPointer(attribLocation, 2, gl.FLOAT, false, 0, 0)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
  },
  get mesh() {
    return this._mesh
  }
})
