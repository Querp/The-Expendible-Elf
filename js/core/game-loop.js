class GameLoop {
    constructor(state) {
        this.state = state;
    }

    update() {
        const upgrades = game.upgrades.upgrades;
        this.handleInput();

        // Pre-round
        if (!this.state.round.hasStarted) {
            game.elves.update();
            game.elves.draw();
            game.presents.update();
            this.state.calcHealthBar(upgrades.health.amount);
            game.buttons.drawMenu();
            this.drawUi();
            game.messages.update();
            game.cooldowns.countDown();
            drawLog();
            return;
        }

        // Round active
        game.elves.update();
        game.elves.draw();
        game.presents.update();
        this.checkEndOfRound();
        this.state.calcHealthBar(upgrades.health.amount);
        this.drawUi();
        game.messages.update();
        game.cooldowns.countDown();
        drawLog();
    }

    handleInput() {
        const inputs = game.inputs;
        const player = game.elves.getPlayer();

        if (inputs.isDown('LEFT')) player.updateAcceleration('left');
        else if (inputs.isDown('RIGHT')) player.updateAcceleration('right');
        else player.updateAcceleration(null);

        if (inputs.consume('DOWN')) Intern.placeIntern(player.pos.x);

        if (inputs.consume('SPACE')) Elf.spacePressed();

        if (inputs.consume('TAB')) game.gameState.ui.showLog = !game.gameState.ui.showLog;

        if (inputs.consume('ENTER') && !this.state.round.hasStarted) {
            this.state.round.hasStarted = true;
            this.prepareNextRound();
        }
    }

    checkEndOfRound() {
        const healthUpgrades = game.upgrades.upgrades.health.amount;
        const totalHealth = this.state.health + healthUpgrades * 100;
        if (totalHealth <= 0) this.endRound();
    }

    endRound() {
        this.state.round.hasStarted = false;
        this.state.round.counter++;
        this.state.round.endFrameCount = frameCount;
    }

    prepareNextRound() {
        game.presents.presents = [];
        this.state.health = Upgrade.calcHealthStat();
        this.state.round.startFrameCount = frameCount;
        Dash.startFrameCount = -1000;
        Intern.prepareNextRound();
        createBackground();
        game.elves.getPlayer().scalar = 1;
        // game.elves.getPlayer().placeElfAtFloor();
        // game.elves.resetPlayerPosition();
    }

    drawUi() {
        if (!this.state.round.hasStarted && this.state.round.counter === 1) return;
        drawUiBalance();
        drawUiRoundCounter();
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
