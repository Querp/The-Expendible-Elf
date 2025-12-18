class Upgrades {
    constructor() {
        this.upgrades = {};
    }

    createUpgrades() {
        const upgradeList = [
            new Upgrade('health', 0, 100, 100),
            new Upgrade('speed', 0, 250, 20),
            new Upgrade('dash', 0, 600, 5),
            new Upgrade('intern', 0, 1000, 5)
        ];

        for (const upgrade of upgradeList) {
            this.upgrades[upgrade.name] = upgrade;
        }
    }
}

