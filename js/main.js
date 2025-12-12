let elf;
let bgCnv;
let cnv;

function setup() {
    setupDrawingModes();
    createBackground();
    Button.createUiButtons();
    elf = new Elf();
}

function draw() {
    cnv.clear();
    Game.update();
    image(bgCnv, 0, 0)
    image(cnv, 0, 0)
    drawLog();
}



function keyPressed() {
    if (keyCode === ENTER) Game.enterPressed();
    if (key === ' ') Elf.spacePressed();
    if (keyCode === TAB) toggleLog();
    return false;
}

function mousePressed() {
    if (mouseButton === LEFT) Game.leftMousePressed();
}
