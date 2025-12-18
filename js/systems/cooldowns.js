class Cooldowns {
    constructor() {
        this.cooldowns = []
    }

    addCooldown(duration, onFinish) {
        const cooldown = new Cooldown(duration, onFinish);
        this.cooldowns.push(cooldown)
        return cooldown
    }

    countDown() {
        for (const cooldown of this.cooldowns) {
            cooldown.countDown();
        }
        this.cooldowns = this.cooldowns.filter(cd => !cd.done);
    }
}