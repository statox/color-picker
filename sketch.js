const sketch = (p5) => {
    const BOX_TOP_HEIGHT = 25;
    const PICKER_WIDTH = 500;
    const SAMPLE_WIDTH = 500;
    const TOTAL_HEIGHT = 300;

    let h = 50;
    let sPicker = 50;
    let bPicker = 60;
    let _x;
    let _y;

    let pickerShader;
    let rainbowShader;
    let uniformShader;
    let shaderBg;

    let appData = {
        hexColor: '',
        rgbColor: '',
        hsbColor: ''
    };

    p5.preload = () => {
        pickerShader = p5.loadShader('shader/picker.vert', 'shader/picker.frag');
        rainbowShader = p5.loadShader('shader/rainbow.vert', 'shader/rainbow.frag');
        uniformShader = p5.loadShader('shader/uniform.vert', 'shader/uniform.frag');
    };

    p5.setup = () => {
        app = new Vue({
            el: '#app',
            data: appData
        });

        const canvas = p5.createCanvas(PICKER_WIDTH + SAMPLE_WIDTH, TOTAL_HEIGHT, p5.WEBGL);
        canvas.parent('canvasDiv');
        p5.colorMode(p5.HSB, 100);
        p5.setAttributes('antialias', true);

        _x = p5.map(50, 0, 100, 0, PICKER_WIDTH);
        _y = p5.map(60, 0, 100, p5.height, BOX_TOP_HEIGHT);

        // initialize the createGraphics layers
        pickerGraphics = p5.createGraphics(PICKER_WIDTH, p5.height - BOX_TOP_HEIGHT, p5.WEBGL);
        pickerGraphics.noStroke();

        rainbowGraphics = p5.createGraphics(p5.width, BOX_TOP_HEIGHT, p5.WEBGL);
        rainbowGraphics.noStroke();

        uniformGraphics = p5.createGraphics(SAMPLE_WIDTH, p5.height, p5.WEBGL);
        uniformGraphics.noStroke();
    };

    let mouseInRainbow = false;
    let mouseInPicker = false;
    p5.draw = () => {
        p5.translate(-p5.width / 2, -p5.height / 2);
        if (!p5.mouseIsPressed) {
            mouseInRainbow = false;
            mouseInPicker = false;
        }

        // Get hue
        if (
            !mouseInPicker &&
            p5.mouseIsPressed &&
            p5.mouseX > 0 &&
            p5.mouseX < p5.width &&
            p5.mouseY > 0 &&
            p5.mouseY < BOX_TOP_HEIGHT
        ) {
            h = p5.map(p5.mouseX, 0, p5.width, 0, 100);
            mouseInRainbow = true;
        }

        // Get saturation and brightness
        if (
            p5.mouseIsPressed &&
            !mouseInRainbow &&
            p5.mouseX > 0 &&
            p5.mouseX < PICKER_WIDTH &&
            p5.mouseY > BOX_TOP_HEIGHT &&
            p5.mouseY < p5.height
        ) {
            _x = p5.mouseX;
            _y = p5.mouseY;
            sPicker = p5.map(p5.mouseX, 0, PICKER_WIDTH, 0, 100);
            bPicker = p5.map(p5.mouseY, BOX_TOP_HEIGHT, p5.height, 100, 0);
            mouseInPicker = true;
        }

        // Picker square with shader
        pickerGraphics.shader(pickerShader);
        pickerShader.setUniform('u_resolution', [PICKER_WIDTH, p5.height - BOX_TOP_HEIGHT]);
        pickerShader.setUniform('u_hue', h / 100);
        pickerGraphics.rect(0, 0, PICKER_WIDTH, p5.height - BOX_TOP_HEIGHT);
        p5.texture(pickerGraphics);
        p5.rect(0, BOX_TOP_HEIGHT, PICKER_WIDTH, p5.height - BOX_TOP_HEIGHT);

        // rainbow
        rainbowGraphics.shader(rainbowShader);
        rainbowShader.setUniform('u_resolution', [p5.width, BOX_TOP_HEIGHT]);
        rainbowGraphics.rect(0, 0, p5.width, BOX_TOP_HEIGHT);
        p5.texture(rainbowGraphics);
        p5.rect(0, 0, p5.width, BOX_TOP_HEIGHT);

        // sample
        uniformGraphics.shader(uniformShader);
        uniformShader.setUniform('u_color', [h / 100, sPicker / 100, bPicker / 100]);
        uniformGraphics.rect(PICKER_WIDTH, BOX_TOP_HEIGHT, SAMPLE_WIDTH, p5.height - BOX_TOP_HEIGHT);
        p5.texture(uniformGraphics);
        p5.rect(PICKER_WIDTH, BOX_TOP_HEIGHT, SAMPLE_WIDTH, p5.height - BOX_TOP_HEIGHT);

        // Picker circle
        p5.noFill();
        p5.stroke('white');
        p5.circle(_x, _y, 30);

        // Rainbow cursor
        const cursorX = p5.map(h, 0, 100, 0, p5.width);
        p5.strokeWeight(10);
        p5.circle(cursorX, BOX_TOP_HEIGHT / 2, BOX_TOP_HEIGHT);
        p5.strokeWeight(1);

        // Interface
        const hsbString = `${((360 * h) / 100).toFixed(0)} ${sPicker.toFixed(0)} ${bPicker.toFixed(0)}`;
        appData.hsbColor = hsbString;

        const {r, g, b} = hsv2rgb(h / 100, sPicker / 100, bPicker / 100);
        appData.rgbColor = `${r} ${g} ${b}`;

        const hexString = rgb2hex(r, g, b);
        appData.hexColor = hexString;
    };
};

new p5(sketch);
