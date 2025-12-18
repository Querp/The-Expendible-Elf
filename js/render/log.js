function drawLog() {
    if (!game.gameState.ui.showLog) return;

    const effective = Dash.getEffectiveDashCooldown();
    const endFrame = Dash.startFrameCount + effective;
    const remaining = max(endFrame - frameCount, 0)

    const logItems = [
        {
            title: 'Cooldown',
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

    cnv.push();
    cnv.textFont('Sans-serif')

    // BG
    cnv.fill('#0a1115c9')
    // rect(width / 2, height / 2, width, height)

    cnv.textAlign(LEFT)

    for (let i = 0; i < logItems.length; i++) {
        const item = logItems[i];
        drawLogItem(item, i);
    }

    cnv.textSize(11)
    cnv.textAlign(CENTER)
    drawPlayerPos();
    drawPresentPos();

    cnv.pop();
}

function drawLogItem(item, i) {
    const rowHeight = 18;
    const y = 15 + i * rowHeight;

    cnv.textSize(15)

    cnv.fill('#fff')
    cnv.text(item.title, 10, y)

    cnv.text(item.value, 140, y)
}

function drawPlayerPos() {
    const p = game.elves.getPlayer();
    cnv.text(floor(p.pos.x), p.pos.x, p.pos.y - 32)

    cnv.text(floor(p.pos.y), p.pos.x - 25, p.pos.y);
}

function drawPresentPos() {
    for (const p of game.presents.presents) {
        if (p.hasFallenToTheFloor) continue
        cnv.text(floor(p.pos.x), p.pos.x, p.pos.y - 20)
        cnv.text(floor(p.pos.y), p.pos.x - 28, p.pos.y)
    }
}