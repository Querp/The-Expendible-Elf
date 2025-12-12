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
    const price = `$ ${Game.upgrades[button.name].price}`;
    cnv.textSize(15)
    cnv.text(price, button.x, button.y + 15)

    // amount
    const amount = Game.upgrades[button.name].amount;
    const max = Game.upgrades[button.name].max;
    cnv.textSize(25)
    cnv.text(`${amount} / ${max}`, button.x - 150, button.y)

    // stat value
    const fps = 60;
    // let dashStat = ;
    
    let statValue;
    cnv.textSize(25)

    if (button.name === 'intern') {
        statValue = `${Game.upgrades[button.name].amount}x`;
        if (Game.upgrades.intern.amount === 0) statValue = '';
    }
    if (button.name === 'dash') {
        statValue = `${((Dash.getEffectiveDashCooldown() - Dash.duration) / fps).toFixed(2)}s`;
        if (Game.upgrades.dash.amount === 0) statValue = '';
    }
    if (button.name === 'speed') statValue = `${elf.speed + Game.upgrades[button.name].amount}vel`;
    if (button.name === 'health') statValue = `${1000 + Game.upgrades[button.name].amount * 100}hp`;

    cnv.text(statValue, button.x + 150, button.y)
}