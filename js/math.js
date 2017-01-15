module.exports.multiplyMatrix = function(a, b) {
  const mat = []

  mat.push(a[0] * b[0] + a[3] * b[1] + a[6] * b[2])
  mat.push(a[1] * b[0] + a[4] * b[1] + a[7] * b[2])
  mat.push(a[2] * b[0] + a[5] * b[1] + a[8] * b[2])

  mat.push(a[0] * b[3] + a[3] * b[4] + a[6] * b[5])
  mat.push(a[1] * b[3] + a[4] * b[4] + a[7] * b[5])
  mat.push(a[2] * b[3] + a[5] * b[4] + a[8] * b[5])

  mat.push(a[0] * b[6] + a[3] * b[7] + a[6] * b[8])
  mat.push(a[1] * b[6] + a[4] * b[7] + a[7] * b[8])
  mat.push(a[2] * b[6] + a[5] * b[7] + a[8] * b[8])

  return mat
}

module.exports.transformMatrix = function(position, rotation, scale) {
  const rot = rotation / 180 * Math.PI
  const rotMat = [ Math.cos(rot), Math.sin(rot), 0, -Math.sin(rot), Math.cos(rot), 0, 0, 0, 1 ]
  const transMat = [ 1, 0, 0, 0, 1, 0, position.x, position.y, 1 ]
  const scaleMat = [ scale.x, 0, 0, 0, scale.y, 0, 0, 0, 1 ]
  return module.exports.multiplyMatrix(transMat, module.exports.multiplyMatrix(rotMat, scaleMat))
}
