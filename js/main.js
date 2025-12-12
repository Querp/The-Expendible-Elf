let elf;
let bgCnv;
let cnv;

function setup() {
    setupDrawingModes();
    elf = new Elf();
    Button.createUiButtons();
    createBackground();
}

function draw() {
    cnv.clear();
    Game.update();
    image(bgCnv, 0, 0)
    image(cnv, 0, 0)
}



function keyPressed() {
    if (keyCode === TAB) return false
    if (keyCode === ENTER) Game.enterPressed();
    if (key === ' ') Elf.spacePressed();
    return false;
}

function mousePressed() {
    if (mouseButton === LEFT) {
        Game.mousePressed('left');
    }
}
