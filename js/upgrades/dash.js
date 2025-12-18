class Dash {
    static dashing = false;
    static duration = 55;
    static startFrameCount = -1000;
    static cooldownStartFrame = null;
    static cooldownDuration = 345;
    static speed = 1;
    static isDashBlockingInput = false;
    static reductionPerUpgrade = 45 // 0.75s
    static minReduction = 10;


    static checkEndOfDash() {
        if (frameCount - this.startFrameCount >= this.duration && this.dashing) {
            this.endDash();
        }
    }

    static endDash() {
        this.dashing = false;
        this.cooldownStartFrame = frameCount;
        this.isDashBlockingInput = false;
    }

    static getEffectiveDashCooldown() {
        const base = this.duration + this.cooldownDuration;
        const reduced = base - game.upgrades.upgrades.dash.amount * this.reductionPerUpgrade;
        return constrain(reduced, this.duration + this.minReduction, base);
    }

    static resetCooldown() {
        this.startFrameCount = frameCount;
    }

    static isCoolingDown() {
        if (this.cooldownStartFrame === null) return false;
        return frameCount - this.cooldownStartFrame < this.cooldownDuration;
    }
}