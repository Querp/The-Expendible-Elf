let leftKeyDown = false;
let rightKeyDown = false;
let elf;
let bgCnv;
let cnv;

function setup() {
    createCanvas(1200, 800);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    colorMode(HSL);

    cnv = createGraphics(width, height);
    cnv.rectMode(CENTER);
    cnv.textAlign(CENTER, CENTER);
    cnv.colorMode(HSL);

    bgCnv = createGraphics(width, height);
    bgCnv.rectMode(CENTER);
    bgCnv.textAlign(CENTER, CENTER);
    bgCnv.colorMode(HSL);

    elf = new Elf();
    Game.init();
    createSceneBackground();
}

function draw() {
    cnv.clear();
    Game.update();
    image(bgCnv, 0, 0)
    image(cnv, 0, 0)
}




function keyPressed() {
    if (keyCode === LEFT_ARROW) leftKeyDown = true;
    if (keyCode === RIGHT_ARROW) rightKeyDown = true;

    if (keyCode === TAB) return false

    if (keyCode === ENTER) Game.enterPressed();
    if (key === ' ') Elf.spacePressed();
}

function keyReleased() {
    if (keyCode === LEFT_ARROW) leftKeyDown = false;
    if (keyCode === RIGHT_ARROW) rightKeyDown = false;
}

function createSceneBackground() {
    bgCnv.background('#333')
    gradientBG(color(0, 0, 30), color(260, 2, 10));

    bgCnv.noStroke()
    bgCnv.fill('#4a4a4aff')
    bgCnv.circle(width / 2, height - 20, 235)

    bgCnv.strokeWeight(32)
    bgCnv.stroke('#3a3a3a ')
    bgCnv.fill('#222');
    bgCnv.circle(width / 2, height - 20, 200)

    bgCnv.strokeWeight(2)
    bgCnv.noFill()
    bgCnv.stroke('#4a4a4a')
    bgCnv.circle(width / 2, height - 20, 170)

    bgCnv.noStroke()
    bgCnv.fill('#fff');
    bgCnv.rect(width / 2, height - 10, width, 20)
}

function gradientBG(c1, c2) {
    for (let y = 0; y < height; y++) {
        let t = y / height;
        let c = lerpColor(c1, c2, t);
        bgCnv.stroke(c);
        bgCnv.line(0, y, width, y);
    }
}

function mousePressed() {
    if (mouseButton === LEFT) {
        Game.mousePressed('left');
    }
}