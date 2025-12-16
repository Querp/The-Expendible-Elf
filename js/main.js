let elf;
let bgCnv;
let cnv;
let game;


function setup() {
    setupDrawingModes();
    createBackground();
    Button.createUiButtons();
    elf = new Elf('player');
    game = {
        presents: new Presents,
    }
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
    if (keyCode === DOWN_ARROW) Game.downArrowPressed();
    return false;
}

function mousePressed() {
    if (mouseButton === LEFT) Game.leftMousePressed();
}
