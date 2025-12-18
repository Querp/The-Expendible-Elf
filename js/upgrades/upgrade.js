class Upgrade {
    constructor(name, amount, price, maxAmount) {
        this.name = name;
        this.amount = amount;
        this.price = price;
        this.maxAmount = maxAmount;
    }

    static isUpgradeMaxed(upgradeName) {
        const upgrade = game.upgrades.upgrades[upgradeName];
        if (!upgrade) return false;

        const isMaxed = upgrade.amount >= upgrade.maxAmount;
        if (isMaxed) game.messages.addMessage(`"${upgradeName}" is maxed out`, 'warning');
        return isMaxed;
    }

    static calcStatValue(upgradeName) {
        switch (upgradeName) {
            case 'health': return this.calcHealthStat();
            case 'speed': return this.calcSpeedStat();
            case 'dash': return this.calcDashStat();
            case 'intern': return this.calcInternStat();
        }
    }

    static calcHealthStat() {
        const base = game.gameState.baseHealth;
        const healthPerUpgrade = 100;
        const upgrades = game.upgrades.upgrades.health.amount;
        return base + upgrades * healthPerUpgrade;
    }

    static calcSpeedStat() {
        return null
    }
    static calcDashStat() {
        return null
    }
    static calcInternStat() {
        return null
    }

}