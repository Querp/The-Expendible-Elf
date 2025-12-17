function drawLog() {
    if (!game.gameState.ui.showLog) return;

    const effective = Dash.getEffectiveDashCooldown();
    const endFrame = Dash.startFrameCount + effective;
    const remaining = max(endFrame - frameCount, 0)

    const logItems = [
        {
            title: 'Remaining Cooldown',
            value: `${remaining} / ${effective}`,
        },
        {
            title: 'Health',
            value: `${game.gameState.health} / ${Upgrade.calcStatValue('health')}`,
        },
        {
            title: 'Spawn Interval',
            value: `${game.presents.spawnInterval.toFixed(2)}`
        },
    ];

    // BG
    fill('#0a1115c9')
    // rect(width / 2, height / 2, width, height)

    textAlign(LEFT)

    for (let i = 0; i < logItems.length; i++) {
        const item = logItems[i];
        drawLogItem(item, i);
    }

    drawPlayerPos();
    drawPresentPos();
}

function drawLogItem(item, i) {
    const rowHeight = 25;
    const y = 35 + i * rowHeight;
    textSize(16)
    fill('#fff')
    text(item.title, 50, y)

    text(item.value, 250, y)
}

function drawPlayerPos() {
    const p = game.elves.getPlayer();
    text(p.pos.x, p.pos.x + 14, p.pos.y)
    textAlign(CENTER)
    text(p.pos.y, p.pos.x, p.pos.y - 36);
}

function drawPresentPos() {
    textSize(13);
    for (const p of game.presents.presents) {
        text(floor(p.pos.x), p.pos.x + 28, p.pos.y)
        text(floor(p.pos.y), p.pos.x, p.pos.y - 20)
    }
}