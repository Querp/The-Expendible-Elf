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
        gameLoop: gameLoop
    }

    setupDrawingModes();
    createBackground();

    game.elves.createPlayer();
    game.upgrades.createUpgrades();
    game.buttons.createButtons();
}

function draw() {
    cnv.clear();
    game.gameLoop.update();
    image(bgCnv, 0, 0)
    image(cnv, 0, 0)
    drawLog();
}



function keyPressed() {
    if (key === ' ') GameInput.handleSpace();
    if (keyCode === ENTER) GameInput.handleEnter(game.gameState, game.gameLoop);
    if (keyCode === DOWN_ARROW) GameInput.handleDownArrow();
    if (keyCode === TAB) toggleLog();
    return false;
}

function mousePressed() {
    if (mouseButton === LEFT) {
        const buttonName = game.buttons.getClickedButtonName();
        if (!buttonName) return;

        GameInput.handleButtonClick(buttonName, game.gameState, game.gameLoop);
    }
}