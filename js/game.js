class Game {
    static roundCounter = 1;
    static roundHasStarted = false;
    static roundStartFrameCount;
    static nextPresentFrame = 0;
    static spawnInterval = 120;
    static buttons = [];
    static balance = 0;
    static upgrades = {
        health: { amount: 0, price: 100 },
        speed: { amount: 0, price: 250 },
        dash: { amount: 2, price: 800 },
        intern: { amount: 0, price: 3000 },
    }
    static health = 1000;
    static healthBar = { height: 1000, }

    static init() {
        this.createUiButtons();
    }

    static update() {
        if (!this.roundHasStarted) {
            Present.drawAllPresents();
            // elf.update();
            elf.draw()
            this.updateHealthBar();
            Button.drawUpgradeMenu();
            this.drawUi();
            return
        }

        elf.update();
        Present.update();
        this.checkEndOfRound();
        this.updateHealthBar();
        this.drawUi();
    }

    static prepareNextRound() {
        Present.presents = [];
        this.health = 1000;
        this.roundStartFrameCount = frameCount;
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

    static mousePressed() {
        if (this.roundHasStarted) return
        const buttonName = Button.getClickedButtonName();
        if (!buttonName) return

        if (this.roundCounter === 1 && buttonName !== 'start') return
        
        if (buttonName === 'start') {
            this.roundHasStarted = true;
            this.prepareNextRound();
            return
        }

        const price = this.upgrades[buttonName].price;
        if (this.balance >= price) {
            this.balance -= price;
            this.upgrades[buttonName].amount++;
        }

        if (buttonName === 'intern') {

        }
        if (buttonName === 'dash') {

        }
        if (buttonName === 'speed') {

        }
        if (buttonName === 'health') {

        }

    }

    static enterPressed() {
        if (this.roundHasStarted) return
        this.roundHasStarted = true;
        this.prepareNextRound();
    }

    static drawUi() {
        if(!this.roundHasStarted && this.roundCounter === 1) return
        cnv.noStroke();

        // Balance
        cnv.textSize(19)
        cnv.fill('#fffdeaff')
        cnv.text('$', 67, 100);

        cnv.textAlign(LEFT)
        cnv.textSize(30)
        // cnv.fill('#ddd')
        cnv.text(this.balance, 80, 100);
        cnv.textAlign(CENTER)

        if(!this.roundHasStarted) return

        // Health bar
        const fullheight = (height - 30) * (this.healthBar.height / (1000 + this.upgrades['health'].amount * 100));
        cnv.push()
        cnv.translate(width, height - 20)
        cnv.rotate(radians(180))
        cnv.rectMode(CORNER)
        cnv.fill('#ffffff19')
        cnv.rect(25, 5, 20, fullheight, 5)
        cnv.pop();

        cnv.rectMode(CENTER)
    }

    static changeHealth(amount) {
        this.health += amount;
        this.health = constrain(this.health, 0, 10000);
    }

    static updateHealthBar() {
        const diff = (this.health + this.upgrades['health'].amount * 100 - this.healthBar.height) * 0.1;
        this.healthBar.height += diff;
    }

    static createUiButtons() {
        new Button('intern', 'Hire Intern', width / 2, height / 2 - 200, 500, 100)
        new Button('dash', 'Unlock Dash', width / 2, height / 2 - 100, 500, 100)
        new Button('speed', 'Speed', width / 2, height / 2, 500, 100)
        new Button('health', 'Health', width / 2, height / 2 + 100, 500, 100)
        new Button('start', 'Start Game', width / 2, height / 2 + 200, 500, 100)
    }
}
