class Upgrade {
    static upgrades = {
        health: { amount: 0, price: 100, max: 100 },
        speed: { amount: 0, price: 250, max: 20 },
        dash: { amount: 0, price: 600, max: 5 },
        intern: { amount: 0, price: 1000, max: 5 },
    }

    static isUpgradeMaxed(upgrade) {
        const amount = this.upgrades[upgrade].amount;
        const max = this.upgrades[upgrade].max;
        const isMaxed = amount === max;
        if (isMaxed) {
            new Message(`"${upgrade}" is maxed out`, 'warning')
        };
        return isMaxed
    }

    static calcStatValue(upgrade) {
        if (upgrade === 'health') return this.calcHealthStat()
        if (upgrade === 'speed') return this.calcSpeedStat()
        if (upgrade === 'dash') return this.calcDashStat()
        if (upgrade === 'intern') return this.calcInternStat()
    }

    static calcHealthStat() {
        const base = Game.baseHealth;
        const healthPerUpgrade = 100;
        const upgrades = this.upgrades.health.amount;
        return base + upgrades * healthPerUpgrade;
    }

    static computeSpeedStat() {

    }
    static computeDashStat() {

    }
    static computeInternStat() {

    }

}