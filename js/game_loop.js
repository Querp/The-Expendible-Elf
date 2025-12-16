class GameLoop {
    constructor(state) {
        this.state = state;
    }

    update() {
        const upgrades = game.upgrades.upgrades;

        // Pre-round
        if (!this.state.round.hasStarted) {
            game.presents.update();
            // game.elves.update();
            game.elves.draw();
            this.state.calcHealthBar(upgrades.health.amount);
            game.buttons.drawMenu();
            this.drawUi();
            game.messages.update();
            game.cooldowns.countDown();
            return;
        }

        // Round active
        game.presents.update();
        game.elves.update();
        game.elves.draw();

        this.checkEndOfRound();
        this.state.calcHealthBar(upgrades.health.amount);
        this.drawUi();
        game.messages.update();
        game.cooldowns.countDown();
    }

    checkEndOfRound() {
        const healthUpgrades = game.upgrades.upgrades.health.amount;
        const totalHealth = this.state.health + healthUpgrades * 100;
        if (totalHealth <= 0) this.endRound();
    }

    endRound() {
        this.state.round.hasStarted = false;
        this.state.round.counter++;
    }

    prepareNextRound() {
        game.presents.presents = [];
        this.state.health = Upgrade.calcHealthStat();
        this.state.round.startFrameCount = frameCount;
        Dash.startFrameCount = -1000;
        Intern.prepareNextRound();
    }

    drawUi() {
        if (!this.state.round.hasStarted && this.state.round.counter === 1) return;
        drawUiBalance();
        if (!this.state.round.hasStarted) return;
        drawUiHealthBar();
        drawUiInternIcons();
    }

    buyUpgrade(upgradeName) {
        const upgrade = game.upgrades.upgrades[upgradeName];
        if (!upgrade) return;

        if (this.state.balance >= upgrade.price) {
            this.state.balance -= upgrade.price;
            upgrade.amount++;
            game.messages.addMessage(`Upgrade ${upgradeName} bought`, 'success');
        } else {
            game.messages.addMessage(`Not enough $ for ${upgradeName}`, 'warning');
        }
    }
}



