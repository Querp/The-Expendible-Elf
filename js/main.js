let bgCnv;
let cnv;
let game;

function setup() {
    game = {
        presents: new Presents,
        elves: new Elves,
        upgrades: new Upgrades,
        buttons: new Buttons,
        messages: new Messages,
        cooldowns: new Cooldowns,
    }
    setupDrawingModes();
    createBackground();
    game.elves.createPlayer();
    game.upgrades.createUpgrades();
    game.buttons.createButtons();

    game.cooldowns.addCooldown(100, () => { Dash.test(); });
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
