/* https://itp-xstory.github.io/p5js-shaders/#/./docs/examples/shaders_to_vertices */

precision highp float;

void main() {
    // gl_FragColor is a built in shader variable, and your .frag file must contain it
    // We are setting the vec3 color into a new vec4, with an transparency of 1 (no opacity)
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}

