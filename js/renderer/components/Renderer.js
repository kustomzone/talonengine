// Renderer.js
// 13 November 2016
// Ravern Koh
// Renderer (built-in component)
'use strict'

const Talon = require('talonengine')

Talon.Component('Renderer', {

  // Default attributes
  _mesh: 'defaultRectangle 100 100 red',
  _anchorPoint: { x: 0, y: 0 },
  // this._width
  // this._height
  _shapes: [],
  // shape.fill
  // shape.vertices
  // shape.buffer
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

    // Get current program
    const program = gl.getParameter(gl.CURRENT_PROGRAM)
    // Transform all vertices from all shapes in this using this.transform info
    const transformUniformLocation = gl.getUniformLocation(program, 'uTransform')
    gl.uniformMatrix3fv(transformUniformLocation, false, new Float32Array(Talon.math.transformMatrix(this.transform.position, this.transform.rotation, this.transform.scale)))

    // Renders the vertices from shape.buffer
    for (let i = 0; i < this._shapes.length; i++) {
      const shape = this._shapes[i]

      const posAttribLocation = gl.getAttribLocation(program, 'aPosition')
      const colorUniformLocation = gl.getUniformLocation(program, 'uColor')
      const color = Talon._util.color(shape.fill)
      gl.uniform4f(colorUniformLocation, color[0], color[1], color[2], color[3])
      gl.bindBuffer(gl.ARRAY_BUFFER, shape.buffer)
      gl.vertexAttribPointer(posAttribLocation, 2, gl.FLOAT, false, 0, 0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, shape.vertices.length / 2)
      gl.bindBuffer(gl.ARRAY_BUFFER, null)
    }

    // Reset render count
    if (this._static.renderCount >= this._static.maxRenderCount) this._static.renderCount = 0
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
        const resUniformLocation = gl.getUniformLocation(program, 'uResolution')
        gl.uniform2f(resUniformLocation, Talon._options.window.width, Talon._options.window.width / Talon._options.window.aspect)

        // Enable position attribute
        const attribLocation = gl.getAttribLocation(program, 'aPosition')
        gl.enableVertexAttribArray(attribLocation)
      }

      createProgram()
    }

    // Load in vertices
    const stringArr = this._mesh.split(' ')

    let width = 100
    let height = 100

    if (stringArr.length >= 2) {
      width = parseInt(stringArr[1])
      if (stringArr.length >= 3) height = parseInt(stringArr[2])
    }

    this._width = width
    this._height = height

    // Convenience var
    const gl = this._static.gl

    // TEMP
    if (stringArr[0].startsWith('default')) {
      const shape = {}

      let fill = 'white'
      if (stringArr.length >= 4) fill = stringArr[3]

      shape.fill = fill

      // Rectangle
      if (stringArr[0].startsWith('defaultRectangle')) shape.vertices = [ 0, 0, 0, height, width, 0, width, height ]
      else if (stringArr[0].startsWith('defaultEllipse')) {
        
      } else {
        console.log('Unrecognized mesh format')
      }

      shape.buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, shape.buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.vertices), gl.DYNAMIC_DRAW)
      gl.bindBuffer(gl.ARRAY_BUFFER, null)

      this._shapes.push(shape)
    }
  },
  get mesh() {
    return this._mesh
  },
  set anchorPoint(value) {
    const prevAnchorPoint = this.anchorPoint
    this._anchorPoint = value

    // Iterate through all and change points
    for (let j = 0; j < this._shapes.length; j++) {
      const shape = this._shapes[j]

      // Change shape vertices
      for (let i = 0; i < shape.vertices.length; i++) {
        if (i % 2 == 0) shape.vertices[i] = shape.vertices[i] - (this.anchorPoint.x - prevAnchorPoint.x) * this._width
        else shape.vertices[i] = shape.vertices[i] - (this.anchorPoint.y - prevAnchorPoint.y) * this._height
      }

      // Convenience var
      const gl = this._static.gl

      gl.bindBuffer(gl.ARRAY_BUFFER, shape.buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.vertices), gl.DYNAMIC_DRAW)
      gl.bindBuffer(gl.ARRAY_BUFFER, null)
    }
  },
  get anchorPoint() {
    return this._anchorPoint
  }
})
