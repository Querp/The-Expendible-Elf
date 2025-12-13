function drawUiBalance() {
    cnv.noStroke();
    cnv.textSize(19)
    cnv.fill('#fffdeaff')
    cnv.text('$', 67, 100);

    cnv.textAlign(LEFT)
    cnv.textSize(30)
    cnv.text(Game.balance, 80, 100);
    
    cnv.textAlign(CENTER)
}

function drawUiHealthBar() {
    const baseHealth = 1000;
    const healthUpgradesAmount = Upgrade.upgrades.health.amount;
    const fullheight = height - 30;
    const barHeight = fullheight * (Game.healthBar.height / (baseHealth + healthUpgradesAmount * 100))

    cnv.push()
    cnv.translate(width, height - 20)
    cnv.rotate(radians(180))
    cnv.rectMode(CORNER)
    cnv.fill('#ffffff19')
    cnv.rect(25, 5, 20, barHeight, 5)

    cnv.pop();
    cnv.rectMode(CENTER)
}