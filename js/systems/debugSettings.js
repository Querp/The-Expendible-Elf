function applyDebugSettings() {
    return

    const round = 2;
    const present = {
        dropHeight: 0,
        fallSpeed: 3,   // 1.45 default
        interval: 50,    // 120 default
    }
    const upgradeAmount = {
        health: 999,
        speed: 20,
        dash: 5,
        intern: 2,
    }

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