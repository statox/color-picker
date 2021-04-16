// The position of the vertex sent by p5
attribute vec3 aPosition;

void main() {
  // Scale to make the output fit the canvas
  // This is required in p5 shaders
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}
