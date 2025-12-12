class Elf {
    constructor(x = width / 2, y = height - 50, scalar = 1) {
        this.pos = { x: x, y: y };
        this.vel = { x: 0, y: 0 };
        this.speed = 10;
        this.angle = {
            self: 0,
            arm: {
                left: -7,
                right: 155,
            },
            leg: {
                left: 0,
                right: 0,
            }
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
        elf.calcLimbAngles();
        elf.calcSelfAngle();
        elf.checkEndOfDash();
        elf.move();
        drawElf(this);
    }

    calcSelfAngle() {
        let targetAngle = this.vel.x * 3;
        if (this.dash.dashing) this.vel.x * 90;
        this.angle.self = lerp(this.angle.self, targetAngle, 0.15);
        if (this.dash.dashing) this.angle.self = this.vel.x * 90;
    }

    calcLimbAngles() {
        let lerpSpeed = 0.18;
        const frameDuration = 5;

        if (this.dash.dashing) {
            this.angle.leg.left = 0;
            this.angle.leg.right = 0;
            this.angle.arm.left = 170;
            this.angle.arm.right = -170;
        }

        if (this.vel.x === 0) {
            this.angle.leg.left = lerp(this.angle.leg.left, 0, lerpSpeed * 4)
            this.angle.leg.right = lerp(this.angle.leg.right, 0, lerpSpeed * 4);
            this.angle.arm.left = lerp(this.angle.arm.left, -150, lerpSpeed * 4);
            this.angle.arm.right = lerp(this.angle.arm.right, 150, lerpSpeed * 4);
            return
        }

        const dirs = [0.3, 1.3, 0.7, 0, -0.3, -1.3, -0.7, 0];
        const keyFrames = dirs.length;
        const loopDuration = keyFrames * frameDuration;

        // which keyframe (0–7)
        const currentFrame = floor(frameCount % loopDuration / frameDuration);

        // desired direction pattern
        const dir = dirs[currentFrame];

        this.angle.leg.left = lerp(this.angle.leg.left, -dir * 75, lerpSpeed)
        this.angle.leg.right = lerp(this.angle.leg.right, dir * 75, lerpSpeed)

        this.angle.arm.left = lerp(this.angle.arm.left, dir * 105, lerpSpeed)
        this.angle.arm.right = lerp(this.angle.arm.right, -dir * 105, lerpSpeed)
    }

    move() {
        const speedUpgrades = Game.upgrades['speed'].amount;
        const speed = this.speed + speedUpgrades * 1;

        if (!this.dash.dashing) {
            this.vel.x = keyIsDown(LEFT_ARROW) ? -1 : keyIsDown(RIGHT_ARROW) ? 1 : 0;
            this.pos.x += this.vel.x * speed * (this.scalar * 0.15);
        } else {
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

    getEffectiveDashCooldown() {
        // base durations
        const base = this.dash.duration + this.dash.cooldownDuration;

        // upgrade influence
        const reduced = base - Game.upgrades.dash.amount * 10;

        // clamp to sane limits
        return constrain(reduced, 90, base);
    }

    checkEndOfDash() {
        if (frameCount - this.dash.startFrameCount >= this.dash.duration) {
            elf.dash.dashing = false;
        }
    }

    static spacePressed() {
        if (Game.upgrades.dash.amount === 0) return
        if (!Game.roundHasStarted) return

        const effective = elf.getEffectiveDashCooldown();
        const endFrame = elf.dash.startFrameCount + effective;

        if (!elf.dash.dashing && frameCount >= endFrame && elf.vel.x !== 0) {
            elf.dash.dashing = true;
            elf.dash.startFrameCount = frameCount;
        }
    }
}
