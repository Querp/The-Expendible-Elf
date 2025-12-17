let bgCnv;
let cnv;
let game;

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
        gameState: gameState,
        gameLoop: gameLoop,
        inputs: new Inputs
    }

    setupDrawingModes();
    createBackground();

    game.elves.createPlayer();
    game.upgrades.createUpgrades();
    game.buttons.createButtons();
    game.inputs.setup();
}

function draw() {
    cnv.clear();
    game.inputs.update();
    game.gameLoop.update();
    image(bgCnv, 0, 0)
    image(cnv, 0, 0)
    drawLog();
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