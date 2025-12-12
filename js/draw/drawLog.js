let isLogToBeDrawn = false;
isLogToBeDrawn = true;

function toggleLog() {
    isLogToBeDrawn = !isLogToBeDrawn
    return false
}

function drawLog() {
    if (!isLogToBeDrawn) return;

    const effective = elf.getEffectiveDashCooldown();
    const endFrame = elf.dash.startFrameCount + effective;
    const remaining = max(endFrame - frameCount, 0)

    const logItems = [
        {
            title: 'Remaining Cooldown',
            value: `${remaining} / ${effective}`,
        },
        {
            title: 'Health',
            value: `${Game.health} / ${1000 + 100 * Game.upgrades.health.amount}`,
        },
        // {
        //     title: 0,
        //     value: 0
        // },
    ];

    // BG
    fill('#0a1115c9')
    // rect(width / 2, height / 2, width, height)
    
    textAlign(LEFT)

    for (let i = 0; i < logItems.length; i++) {
        const item = logItems[i];
        drawLogItem(item, i);
    }
}

function drawLogItem(item, i) {
    const rowHeight = 25;
    const y = 35 + i * rowHeight;
    textSize(16)
    fill('#fff')
    text(item.title, 50, y)

    text(item.value, 250, y)
}