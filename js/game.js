class Game {
    static roundCounter = 1;
    static roundHasStarted = false;
    static roundStartFrameCount;
    static nextPresentFrame = 0;
    static spawnInterval = 120;
    static balance = 0;
    static upgrades = {
        health: { amount: 0, price: 100 },
        speed: { amount: 0, price: 250 },
        dash: { amount: 2, price: 800 },
        intern: { amount: 0, price: 3000 },
    }
    static health = 1000;
    static healthBar = { height: 1000, }

    static update() {
        if (!this.roundHasStarted) {
            Present.drawAllPresents();
            // elf.update();
            drawElf(elf)
            this.calcHealthBar();
            Button.drawMenu();
            this.drawUi();
            return
        }

        elf.update();
        Present.update();
        this.checkEndOfRound();
        this.calcHealthBar();
        this.drawUi();
    }

    static checkEndOfRound() {
        const healthUpgrades = this.upgrades['health'].amount;
        const health = this.health + healthUpgrades * 100;
        if (health <= 0) this.endRound();
    }

    static endRound() {
        this.roundHasStarted = false;
        this.roundCounter++
    }

    static prepareNextRound() {
        Present.presents = [];
        this.health = 1000;
        this.roundStartFrameCount = frameCount;
    }

    static leftMousePressed() {
        if (this.roundHasStarted) return

        const buttonName = Button.getClickedButtonName();
        if (!buttonName) return

        if (this.roundCounter === 1 && buttonName !== 'start') return

        if (buttonName === 'start') {
            this.roundHasStarted = true;
            this.prepareNextRound();
            return
        }

        if (buttonName === 'intern') { }
        if (buttonName === 'dash') { }
        if (buttonName === 'speed') { }
        if (buttonName === 'health') { }

        const price = this.upgrades[buttonName].price;
        if (this.balance >= price) {
            this.balance -= price;
            this.upgrades[buttonName].amount++;
        }
    }

    static enterPressed() {
        if (this.roundHasStarted) return
        this.roundHasStarted = true;
        this.prepareNextRound();
    }

    static drawUi() { 
        if (!this.roundHasStarted && this.roundCounter === 1) return
        drawUiBalance(this);
        if (!this.roundHasStarted) return
        drawUiHealthBar(this);
    }

    static changeHealth(amount) {
        this.health += amount;
        this.health = constrain(this.health, 0, 10000);
    }

    static calcHealthBar() {
        const diff = (this.health + this.upgrades['health'].amount * 100 - this.healthBar.height) * 0.1;
        this.healthBar.height += diff;
    }

}
