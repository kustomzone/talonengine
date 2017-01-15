attribute vec2 position;

uniform vec2 resolution;
uniform mat3 transform;

void main() {
  vec2 pos = position;

  vec3 position3f = transform * vec3(pos, 1.0);
  pos = vec2(position3f.x, position3f.y);

  vec2 finalPosition = (pos / resolution) * 2.0 - 1.0;

  gl_Position = vec4(finalPosition, 0.0, 1.0);
}
