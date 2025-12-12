class Elf {
    constructor(x = width / 2, y = height - 50, scalar = 1) {
        this.pos = { x: x, y: y };
        this.vel = { x: 0, y: 0 };
        this.speed = 10;
        this.angle = {
            self: 0,
            arm: { left: -7, right: 155, },
            leg: { left: 0, right: 0, }
        };
        this.eyePosX = { left: -2.5, right: 2.5 }
        this.scalar = scalar;
        this.animationToPlay = 'walk';
        this.dash = {
            dashing: false,
            duration: 55,
            startFrameCount: -1000,
            cooldownDuration: 270,
            speed: 1,
        }
    }

    update() {
        calcElfLimbAngles(this);
        calcElfSelfAngle(this);
        elf.checkEndOfDash();
        elf.move();
        drawElf(this);
    }

    checkEndOfDash() {
        if (frameCount - this.dash.startFrameCount >= this.dash.duration) {
            elf.dash.dashing = false;
        }
    }

    move() {
        const speedUpgrades = Game.upgrades['speed'].amount;
        const speed = this.speed + speedUpgrades * 1;

        if (!this.dash.dashing) {
            this.vel.x = keyIsDown(LEFT_ARROW) ? -1 : keyIsDown(RIGHT_ARROW) ? 1 : 0;
            this.pos.x += this.vel.x * speed * (this.scalar * 0.15);
        } else {
            // DASH
            const dashSpeed = (this.vel.x * 10) * (speed / 5) * (this.scalar * 0.15) * elf.dash.speed;
            this.pos.x += dashSpeed;
        }

        if (this.pos.x < 12 || this.pos.x > width - 12) {
            this.vel.x = 0;
            if (this.dash.dashing) {
                this.dash.dashing = false;
            }
        }
        this.pos.x = constrain(this.pos.x, 12, width - 12);
    }

    // Dash
    static spacePressed() {
        if (Game.upgrades.dash.amount === 0) return
        if (!Game.round.hasStarted) return

        const effective = elf.getEffectiveDashCooldown();
        const endFrame = elf.dash.startFrameCount + effective;

        if (!elf.dash.dashing && frameCount >= endFrame && elf.vel.x !== 0) {
            elf.dash.dashing = true;
            elf.dash.startFrameCount = frameCount;
        }
    }

    getEffectiveDashCooldown() {
        const reductionPerUpgrade = 50;
        const minReduction = 10;
        const base = this.dash.duration + this.dash.cooldownDuration;
        const reduced = base - Game.upgrades.dash.amount * reductionPerUpgrade;
        return constrain(reduced, this.dash.duration + minReduction, base);
    }

}
