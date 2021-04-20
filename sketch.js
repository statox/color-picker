const sketch = (p5) => {
    p5.preload = () => {
        // load the shader
        theShader = p5.loadShader('shader/basic.vert', 'shader/basic.frag');
    };

    p5.setup = () => {
        // shaders require WEBGL mode to work
        p5.createCanvas(710, 400, p5.WEBGL);
        p5.noStroke();
    };

    p5.draw = () => {
        // shader() sets the active shader with our shader
        p5.shader(theShader);

        // rect gives us some geometry on the screen
        p5.rect(0, 0, p5.width, p5.height);
    };
};

new p5(sketch);
