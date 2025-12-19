class GameState {
    constructor() {
        this.balance = 0;
        this.baseHealth = 1000;
        this.health = this.baseHealth;
        this.healthBar = { height: 1000 };

        this.round = {
            counter: 1,
            hasStarted: false,
            startFrameCount: null,
            endFrameCount: null,
        };
        this.ui = {
            showLog: false,
        }
    }

    changeHealth(amount) {
        this.health += amount;
        this.health = constrain(this.health, 0, 10000);
    }

    calcHealthBar(upgradeHealth = 0) {
        const diff = (this.health + upgradeHealth * 100 - this.healthBar.height) * 0.1;
        this.healthBar.height += diff;
    }
}
