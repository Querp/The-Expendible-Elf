function drawMenuButton(button) {
    // outline
    cnv.fill('#c3c3c3ff');
    if (button.isHovered()) cnv.fill('#fff')
    cnv.strokeWeight(3);
    cnv.stroke('#222')
    cnv.rect(button.x, button.y, button.width, button.height)

    // title
    cnv.textSize(25)
    cnv.fill('#000')
    cnv.noStroke();
    if (button.name === 'start') {
        cnv.textSize(35)
        cnv.text(button.text, button.x, button.y - 4)
        cnv.textSize(10)
        cnv.text('[ ENTER ]', button.x, button.y + 18)
        return
    }
    cnv.noStroke();
    cnv.text(button.text, button.x, button.y - 8)

    // cost
    const price = `$ ${game.upgrades.upgrades[button.name].price}`;
    cnv.textSize(15)
    cnv.text(price, button.x, button.y + 15)

    // amount
    const amount = game.upgrades.upgrades[button.name].amount;
    const max = game.upgrades.upgrades[button.name].maxAmount;
    cnv.textSize(25)
    cnv.text(`${amount} / ${max}`, button.x - 150, button.y)

    // stat value
    const fps = 60;
    let statValue;
    cnv.textSize(25)

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

    cnv.text(statValue, button.x + 150, button.y)
}