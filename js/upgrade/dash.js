class Dash {
    static dashing = false;
    static duration = 55;
    static startFrameCount = -1000;
    static cooldownDuration = 270;
    static speed = 1;

    static reductionPerUpgrade = 50
    static minReduction = 10;


    static checkEndOfDash() {
        if (frameCount - this.startFrameCount >= this.duration) {
            this.dashing = false;
        }
    }

    static getEffectiveDashCooldown() {
        const base = this.duration + this.cooldownDuration;
        const reduced = base - Upgrade.upgrades.dash.amount * this.reductionPerUpgrade;
        return constrain(reduced, this.duration + this.minReduction, base);
    }

}