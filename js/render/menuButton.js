function drawMenuButton(button) {
    // button outline
    cnv.fill('#c3c3c3ff');
    if (button.isHovered()) cnv.fill('#fff')
    cnv.strokeWeight(3);
    cnv.stroke('#222')
    cnv.rect(button.x, button.y, button.width, button.height, 15)

    // description outline
    if (button.name !== 'start') {
        cnv.noStroke();
        cnv.fill('#000000be')
        cnv.rect(button.x, button.y - 58, 184, 74, 3)
    }

    // description
    cnv.fill('#000')
    cnv.fill('#555')
    cnv.fill('#252525')
    cnv.fill('#f3f3f3ff')

    cnv.noStroke();
    if (button.name === 'start') {
        cnv.textSize(35)
        cnv.fill('#1c1c1cff')
        cnv.text(button.text, button.x, button.y - 1)
        cnv.textSize(10)
        cnv.fill('#252525')
        cnv.text('[ ENTER ]', button.x, button.y + 22)
        return
    }
    cnv.noStroke();
    cnv.textSize(35)
    cnv.text(button.text, button.x, button.y - 72)

    // price
    const price = game.upgrades.upgrades[button.name].price;
    cnv.textSize(31)
    cnv.fill('#252525')
    // cnv.fill('#c3c3c3ff')
    // cnv.text(`$ ${price}`, button.x, button.y + 68)
    cnv.text(price, button.x, button.y + 68)
    cnv.text('$', button.x-42, button.y + 68)
    cnv.noStroke();


    // amount
    const amount = game.upgrades.upgrades[button.name].amount;
    const max = game.upgrades.upgrades[button.name].maxAmount;

    cnv.textSize(20)
    cnv.fill('#1c1c1cff')
    cnv.fill('#a1a1a1ff')
    cnv.text(`${amount} / ${max}`, button.x, button.y - 38)

    // stat value
    const fps = 60;
    let statValue;


    if (button.name === 'intern') {
        statValue = `${game.upgrades.upgrades[button.name].amount}x`;
        if (game.upgrades.upgrades.intern.amount === 0) statValue = '';
    }
    if (button.name === 'dash') {
        statValue = `${((Dash.getEffectiveDashCooldown() - Dash.duration) / fps).toFixed(2)}s`;
        if (game.upgrades.upgrades.dash.amount === 0) statValue = '';
    }
    const player = game.elves.getPlayer();
    if (button.name === 'speed') statValue = `${player.speed + game.upgrades.upgrades[button.name].amount}vel`;
    if (button.name === 'health') statValue = `${Upgrade.calcStatValue(button.name)}hp`;

    cnv.textSize(20)
    cnv.fill('#555')
    cnv.fill('#252525')
    // cnv.fill('#271556ff')
    cnv.text(statValue, button.x, button.y + 100)

    // icon
    drawIcon(button.x, button.y + 19, button.name)
}

function drawIcon(desiredX, desiredY, name) {
    const names = { 'health': 0, 'speed': 1, 'dash': 2, 'intern': 3 };
    const tileId = names[name];
    const TILE_SIZE = 240;
    let outputSize = 40;

    const x = desiredX - outputSize / 2;
    const y = desiredY - outputSize / 2;
    const dx = outputSize;
    const dy = outputSize;
    const sx = tileId * TILE_SIZE;
    const sy = 0;
    const sw = TILE_SIZE;
    cnv.image(iconsImg, x, y, dx, dy, sx, sy, sw)
}