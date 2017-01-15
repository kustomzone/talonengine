// Renderer.js
// 13 November 2016
// Ravern Koh
// Renderer (built-in component)
'use strict'

const Talon = require('talonengine')

Talon.Component('Renderer', {

  // Default attributes
  _mesh: 'defaultRectangle 100 100 white black 1',
  anchorPoint: { x: 0, y: 0 },
  _localPoints: [],
  // this._buffer
  // this._static.renderCount
  // this._static.maxRenderCount
  // this._static.gl
  // this._static.notFirst


  // Override
  init: function() {
    this._static.renderCount = 0
    this._static.maxRenderCount++
  },
  update: function() {
    // Convenience var
    const gl = this._static.gl

    // Keeps track of which Renderer instance is first or last
    if (this._static.renderCount == 0) {
      gl.clear(gl.COLOR_BUFFER_BIT)
    }
    this._static.renderCount++

    // Renders from the buffer
    const program = gl.getParameter(gl.CURRENT_PROGRAM)
    const attribLocation = gl.getAttribLocation(program, 'position')
    const uniformLocation = gl.getUniformLocation(program, 'transform')
    this.counter = this.counter == undefined ? 0 : this.counter + 1
    gl.uniformMatrix3fv(uniformLocation, false, new Float32Array(Talon.math.transformMatrix(this.transform.position, this.transform.rotation, this.transform.scale)))
    gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer)
    gl.vertexAttribPointer(attribLocation, 2, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.TRIANGLES, 0, this._localPoints.length / 2)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)

    // Reset render count
    if (this._static.renderCount == this._static.maxRenderCount) this._static.renderCount = 0
  },


  // Getters and setters
  set mesh(value) {
    this._mesh = value
    if (this._static.notFirst == undefined) {
      this._static.notFirst = true
      this._static.maxRenderCount = 0
      // Do setup code
      const canvas = document.getElementById('canvas')
      this._static.gl = canvas.getContext('webgl')
      // Convenience var
      const gl = this._static.gl

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

        // Set uniforms
        const resUniformLocation = gl.getUniformLocation(program, 'resolution')
        gl.uniform2f(resUniformLocation, Talon._options.window.width, Talon._options.window.width / Talon._options.window.aspect)
      }

      createProgram()
    }

    // Load in vertices
    const stringArr = this._mesh.split(' ')
    this._localPoints = [ 0, 0, 0, 100, 100, 100, 0, 0, 100, 0, 100, 100 ]

    // Convenience var
    const gl = this._static.gl

    const attribLocation = gl.getAttribLocation(gl.getParameter(gl.CURRENT_PROGRAM), 'position')
    this._buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._localPoints), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(attribLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
  },
  get mesh() {
    return this._mesh
  }
})
