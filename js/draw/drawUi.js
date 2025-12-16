function drawUiBalance() {
    cnv.noStroke();
    cnv.textSize(19)
    cnv.fill('#fffdeaff')
    cnv.text('$', 67, 100);

    cnv.textAlign(LEFT)
    cnv.textSize(30)
    cnv.text(game.gameState.balance, 80, 100);

    cnv.textAlign(CENTER)
}

function drawUiHealthBar() {
    // const baseHealth = game.gameState.baseHealth;
    // const upgradesAmount = Upgrade.upgrades.health.amount;
    const fullheight = height - 30;

    const healthValue = Upgrade.calcStatValue('health');
    const barHeight = fullheight * (game.gameState.healthBar.height / healthValue)

    cnv.push()
    cnv.translate(width, height - 20)
    cnv.rotate(radians(180))
    cnv.rectMode(CORNER)
    cnv.fill('#ffffff19')
    cnv.rect(25, 5, 20, barHeight, 5)

    cnv.pop();
    cnv.rectMode(CENTER)
}


function drawUiInternIcons() {
    const target = game.upgrades.upgrades.intern.amount - Intern.getInternAmount();
    for (let i = 0; i < target; i++) {
        const x = 75 + i * 32;
        const y = 140;
        cnv.fill('#171717ff')
        cnv.strokeWeight(2);
        cnv.stroke('#6767677e')
        cnv.circle(x, y, 30)
        cnv.noStroke();
        cnv.fill('hsla(282, 43%, 39%, 1.00)')
        cnv.triangle(
            x - 6.3, y + 8,
            x, y - 8,
            x + 6.3, y + 8,);
    }
}