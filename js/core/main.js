let bgCnv;
let cnv;
let game;
let iconsImg;

function preload() {
    iconsImg = loadImage('img/upgrade-icons.webp');
}

function setup() {
    const gameState = new GameState();
    const gameLoop = new GameLoop(gameState);

    game = {
        presents: new Presents,
        elves: new Elves,
        upgrades: new Upgrades,
        buttons: new Buttons,
        messages: new Messages,
        cooldowns: new Cooldowns,
        inputs: new Inputs,
        gameState: gameState,
        gameLoop: gameLoop,
    }

    setupDrawingModes();
    createBackground();
    game.elves.createPlayer();
    game.upgrades.createUpgrades();
    game.buttons.createButtons();
    game.inputs.setup();
    applyDebugSettings();
}

function draw() {
    cnv.clear();
    game.inputs.update();
    game.gameLoop.update();
    image(bgCnv, 0, 0);
    image(cnv, 0, 0);


    // show nextInternToMove
    // bug: don't show when not all interns all spawned
    const i = Intern.getNextInternToMove();
    noStroke()
    if (i) circle(i.pos.x, i.pos.y-70, 10)
}



function keyPressed() {
    game.inputs.onKeyPressed();
    if (keyCode === TAB) return false;
}

function mousePressed() {
    if (mouseButton === LEFT) {
        const buttonName = game.buttons.getClickedButtonName();
        if (!buttonName) return;
        Input.handleButtonClick(buttonName, game.gameState, game.gameLoop);
    }
}

