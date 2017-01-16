attribute vec2 aPosition;

uniform vec4 uColor;
uniform vec2 uResolution;
uniform mat3 uTransform;

varying vec4 vColor;

void main() {
  // Pass color to fragment
  vColor = uColor;

  // Apply transform
  vec2 pos = aPosition;
  vec3 position3 = uTransform * vec3(pos, 1.0);
  pos = vec2(position3.x, position3.y);

  // Convert to clip space; flip y axis
  vec2 finalPosition = (pos / uResolution) * 2.0 - 1.0;
  finalPosition.y *= -1.0;

  gl_Position = vec4(finalPosition, 0.0, 1.0);
}
