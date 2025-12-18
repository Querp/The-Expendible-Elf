function applyDebugSettings() {
    // return

    const balance = 10000;
    const round = 2;
    const present = {
        dropHeight: 0,
        fallSpeed: 1.45,   // 1.45 default
        interval: 30,    // 120 default
    }
    const upgradeAmount = {
        health: 999,
        speed: 20,
        dash: 0,
        intern: 0,
    }



    game.gameState.balance = balance;
    game.gameState.round.counter = round;

    Present.dropHeight = present.dropHeight;
    Present.fallSpeed = present.fallSpeed;
    game.presents.baseSpawnInterval = present.interval;
    game.presents.minSpawnInterval = 1;

    game.upgrades.upgrades.health.amount = upgradeAmount.health;
    game.upgrades.upgrades.speed.amount = upgradeAmount.speed;
    game.upgrades.upgrades.dash.amount = upgradeAmount.dash;
    game.upgrades.upgrades.intern.amount = upgradeAmount.intern;
}