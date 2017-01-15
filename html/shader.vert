attribute vec2 position;

uniform float devicePixelRatio;
uniform vec2 resolution;
uniform mat3 transform;

void main() {
  vec2 pos = position;

  vec3 position3f = transform * vec3(pos, 1.0);
  pos = vec2(position3f.x, position3f.y);

  vec2 finalPosition = vec2(pos.x / resolution.x, 1.0 - pos.y / resolution.y);
  finalPosition = finalPosition * 2.0;
  finalPosition = finalPosition - 1.0;

  gl_Position = vec4(finalPosition, 0.0, 1.0);
}
