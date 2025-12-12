class Game {
    static balance = 9990;
    static health = 1000;
    static healthBar = { height: 1000, }
    static round = {
        counter: 1,
        hasStarted: false,
        startFrameCount: null,
    };
    static present = {
        nextPresentFrame: 0,
        spawnInterval: 120,
    }
    static upgrades = {
        health: { amount: 0, price: 100, max: 100 },
        speed: { amount: 0, price: 250, max: 20 },
        dash: { amount: 0, price: 600, max: 5 },
        intern: { amount: 0, price: 1000, max: 3 },
    }

    static update() {
        Intern.drawAllInterns()

        if (!this.round.hasStarted) {
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
        this.round.hasStarted = false;
        this.round.counter++
    }

    static prepareNextRound() {
        Present.presents = [];
        this.health = 1000;
        this.round.startFrameCount = frameCount;
        Intern.prepareNextRound();
    }

    static drawUi() {
        if (!this.round.hasStarted && this.round.counter === 1) return
        drawUiBalance(this);
        if (!this.round.hasStarted) return
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

    static enterPressed() {
        if (this.round.hasStarted) return
        this.round.hasStarted = true;
        this.prepareNextRound();
    }

    static leftMousePressed() {
        if (this.round.hasStarted) return

        const buttonName = Button.getClickedButtonName();
        if (!buttonName) return

        if (this.round.counter === 1 && buttonName !== 'start') return

        if (buttonName === 'start') {
            this.round.hasStarted = true;
            this.prepareNextRound();
            return
        }

        // check if upgrade is maxed 
        if (this.upgrades[buttonName].amount === this.upgrades[buttonName].max) return

        if (buttonName === 'intern') { }
        if (buttonName === 'dash') {
            if (this.upgrades['dash'].amount === 0) {
                Button.buttons[1].text = "Upgrade Dash"
            }
        }
        if (buttonName === 'speed') { }
        if (buttonName === 'health') { }

        const price = this.upgrades[buttonName].price;
        if (this.balance >= price) {
            // Buy Upgrade
            this.balance -= price;
            this.upgrades[buttonName].amount++;
        }
    }

    static downArrowPressed() {
        if (this.upgrades.intern.amount > 0 || true) {
            Intern.placeIntern(elf.pos.x);
        }
    }
}
