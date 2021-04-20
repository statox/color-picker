precision highp float;

uniform vec2 u_resolution;

// https://gist.github.com/yiwenl/745bfea7f04c456e0101
vec3 hsb2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    // Normalize the position between 0 and 1
    vec2 st = gl_FragCoord.xy/u_resolution.xy; 

    // Get the current hue aas uniform and use the position
    // to make the hsb color and translate it
    vec3 color = hsb2rgb(vec3(st.x, 1, 1));

    // Color the pixel
    gl_FragColor = vec4(color, 1.0);
}
