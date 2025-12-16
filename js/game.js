class Game {
    static balance = 1000;
    static baseHealth = 1000
    static health = this.baseHealth;
    static healthBar = { height: 1000, }
    static round = {
        counter: 1,
        hasStarted: false,
        startFrameCount: null,
    };

    static update() {

        if (!this.round.hasStarted) {
            game.presents.update();
            game.elves.update();
            game.elves.draw();
            this.calcHealthBar();
            Button.drawMenu();
            this.drawUi();
            Message.update();
            return
        }
        
        game.presents.update();
        game.elves.update();
        game.elves.draw();
        
        this.checkEndOfRound();
        this.calcHealthBar();
        this.drawUi();
        Message.update();
    }

    static checkEndOfRound() {
        const healthUpgrades = Upgrade.upgrades['health'].amount;
        const health = this.health + healthUpgrades * 100;
        if (health <= 0) this.endRound();
    }

    static endRound() {
        this.round.hasStarted = false;
        this.round.counter++
    }

    static prepareNextRound() {
        game.presents.presents = [];
        this.health = Upgrade.calcHealthStat();
        this.round.startFrameCount = frameCount;
        Dash.startFrameCount = -1000;
        Intern.prepareNextRound();
    }

    static drawUi() {
        if (!this.round.hasStarted && this.round.counter === 1) return
        drawUiBalance();
        if (!this.round.hasStarted) return
        drawUiHealthBar();
        drawUiInternIcons();
    }

    static changeHealth(amount) {
        this.health += amount;
        this.health = constrain(this.health, 0, 10000);
    }

    static calcHealthBar() {
        const diff = (this.health + Upgrade.upgrades['health'].amount * 100 - this.healthBar.height) * 0.1;
        this.healthBar.height += diff;
    }

    static enterPressed() {
        if (this.round.hasStarted) return
        this.round.hasStarted = true;
        this.prepareNextRound();
    }

    static leftMousePressed() {
        const buttonName = Button.getClickedButtonName();

        if (!buttonName || this.round.hasStarted) return
        
        if (buttonName === 'start') {
            this.round.hasStarted = true;
            this.prepareNextRound();
            return
        }
        
        if (Upgrade.isUpgradeMaxed(buttonName)) return

        // rename 'Unlock Dash'
        if (buttonName === 'dash' && Upgrade.upgrades.dash.amount === 0) {
            Button.buttons[1].text = "Upgrade Dash";
        }

        this.buyUpgrade(buttonName)
    }

    static buyUpgrade(buttonName){
        const price = Upgrade.upgrades[buttonName].price;

        if (this.balance >= price) {
            this.balance -= price;
            Upgrade.upgrades[buttonName].amount++;
            new Message(`upgrade ${buttonName} bought`, 'success')
        } else {
            new Message(`not enough $ for ${buttonName}`, 'warning')
        }
    }

    static downArrowPressed() {
        if (Upgrade.upgrades.intern.amount > 0 || true) {
            const player = game.elves.getPlayer();
            Intern.placeIntern(player.pos.x);
        }
    }
}
