const sketch = (p5) => {
    const BOX_TOP_HEIGHT = 50;
    const PICKER_WIDTH = 300;
    const SAMPLE_WIDTH = 300;

    let h = 50;
    let sPicker = 50;
    let bPicker = 60;
    let _x = 50;
    let _y = p5.map(60, 0, 100, p5.height, BOX_TOP_HEIGHT);

    p5.setup = () => {
        const canvas = p5.createCanvas(PICKER_WIDTH + SAMPLE_WIDTH, 300);
        canvas.parent('canvasDiv');
        p5.colorMode(p5.HSB, 100);
        console.clear();
    };

    p5.draw = () => {
        p5.noStroke();
        let mouseInPicker = false;

        // top box
        for (let x = 0; x < p5.width; x++) {
            const h = p5.map(x, 0, p5.width, 0, 100);
            p5.stroke(h, 100, 100);
            p5.line(x, 0, x, BOX_TOP_HEIGHT);
        }

        // Get hue
        if (p5.mouseX > 0 && p5.mouseX < p5.width && p5.mouseY > 0 && p5.mouseY < BOX_TOP_HEIGHT) {
            h = p5.map(p5.mouseX, 0, p5.width, 0, 100);
            mouseInPicker = true;
        }

        // bottom box
        for (let y = BOX_TOP_HEIGHT; y < p5.height; y++) {
            for (let x = 0; x < PICKER_WIDTH; x++) {
                const _s = p5.map(x, 0, PICKER_WIDTH, 0, 100);
                const _b = p5.map(y, BOX_TOP_HEIGHT, p5.height, 100, 0);
                p5.stroke(h, _s, _b);
                p5.point(x, y);
            }
        }

        // Right sample
        if (
            p5.mouseIsPressed &&
            !mouseInPicker &&
            p5.mouseX > 0 &&
            p5.mouseX < PICKER_WIDTH &&
            p5.mouseY > BOX_TOP_HEIGHT &&
            p5.mouseY < p5.height
        ) {
            _x = p5.mouseX;
            _y = p5.mouseY;
            sPicker = p5.map(p5.mouseX, 0, PICKER_WIDTH, 0, 100);
            bPicker = p5.map(p5.mouseY, BOX_TOP_HEIGHT, p5.height, 100, 0);
        }
        p5.fill(h, sPicker, bPicker);
        p5.rect(PICKER_WIDTH, BOX_TOP_HEIGHT, p5.width, p5.height);
        p5.noFill();
        p5.stroke(250);
        p5.circle(_x, _y, 10);

        // Interface
        const hsbString = `HSB: ${h.toFixed(0)} ${sPicker.toFixed(0)} ${bPicker.toFixed(0)}`;
        document.getElementById('hsb_span').innerHTML = hsbString;
    };
};

new p5(sketch);