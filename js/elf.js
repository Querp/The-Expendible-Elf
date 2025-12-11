class Elf {

    constructor(x = width / 2, y = height - 50, scalar = 1, addToList = true) {
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
        elf.draw();
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
        // const dirs = [1, 0, -1, 0];
        const keyFrames = dirs.length;
        const loopDuration = keyFrames * frameDuration;

        // which keyframe (0–3)
        const currentFrame = floor(frameCount % loopDuration / frameDuration);

        // desired direction pattern
        const dir = dirs[currentFrame];

        this.angle.leg.left = lerp(this.angle.leg.left, -dir * 75, lerpSpeed)
        this.angle.leg.right = lerp(this.angle.leg.right, dir * 75, lerpSpeed)

        // lerpSpeed = 0.12;
        this.angle.arm.left = lerp(this.angle.arm.left, dir * 105, lerpSpeed)
        this.angle.arm.right = lerp(this.angle.arm.right, -dir * 105, lerpSpeed)
    }

    draw() {
        cnv.push();
        cnv.translate(this.pos.x, this.pos.y);
        cnv.scale(this.scalar, this.scalar);
        cnv.rotate(radians(this.angle.self));
        cnv.stroke(0);
        cnv.strokeWeight(0.2)
        cnv.noStroke();
        // if (this.scalar < 3) noStroke();

        this.drawHead();

        if (this.vel.x === 0) {
            this.drawChest();
            this.drawLegLeft();
            this.drawLegRight();
            this.drawArmLeft();
            this.drawArmRight();
        } else if (this.vel.x === -1) {
            this.drawLegRight();
            this.drawArmRight();
            this.drawChest();
            this.drawLegLeft();
            this.drawArmLeft();
        } else {
            this.drawLegLeft();
            this.drawArmLeft();
            this.drawChest();
            this.drawLegRight();
            this.drawArmRight();
        }

        cnv.rotate(radians(-this.angle.self));
        this.drawDashCoolDown();
        cnv.pop();
    }

    drawHead() {
        cnv.noStroke()
        cnv.fill('#e2c68fff');
        cnv.circle(0, -8, 13);

        cnv.fill('#000');
        cnv.strokeWeight(0.1);
        cnv.strokeWeight(0.1);
        cnv.stroke(255);
        let eyeLeftOffset = 0;  // perspective of user
        let eyeRightOffset = 0;
        if (this.vel.x === 1) eyeRightOffset = -1;
        if (this.vel.x === -1) eyeLeftOffset = 1;
        const targetEyeLeftX = -2.5 + this.vel.x * 7 + eyeLeftOffset * 2;
        const targetEyeRightX = 2.5 + this.vel.x * 7 + eyeRightOffset * 2;

        this.eyePosX.left = lerp(this.eyePosX.left, targetEyeLeftX, 0.3)
        this.eyePosX.right = lerp(this.eyePosX.right, targetEyeRightX, 0.3)

        cnv.circle(this.eyePosX.left, -8, constrain((2.3 + this.vel.x * 0.75), 0, 2.3));
        cnv.circle(this.eyePosX.right, -8, constrain((2.3 - this.vel.x * 0.75), 0, 2.3));

        cnv.noStroke();
        cnv.fill('#388e3fff');
        cnv.triangle(
            -6.3, -12,
            0, -28,
            6.3, -12,
        );

        cnv.fill('#c72b2bff');
        cnv.rect(0, -12, 13, 1.5, 0.2);
    }

    drawChest() {
        const chestWidth = this.vel.x === 0 ? 10.5 : 6;
        cnv.fill('#388e3fff');
        cnv.rect(0, 5.5, chestWidth, 14, 3);
    }

    drawArmLeft() {
        const xOffset = this.vel.x !== 0 ? 0 : 4;
        cnv.fill('#e2c68fff');
        cnv.push();
        cnv.translate(xOffset, 0)
        cnv.rotate(radians(this.angle.arm.left + 90));
        cnv.rect(6.25, 0, 14, 1.7, 999)
        cnv.circle(13.5, 0, 3)
        cnv.pop();
    }

    drawArmRight() {
        const xOffset = this.vel.x !== 0 ? 0 : -4;
        cnv.fill('#e2c68fff');
        cnv.push();
        cnv.translate(xOffset, 0);
        cnv.rotate(radians(this.angle.arm.right + 90));
        cnv.rect(6.25, 0, 14, 1.7, 999);
        cnv.circle(13.5, 0, 3);
        cnv.fill('#1d1d1dff');
        cnv.rect(0, 0, 0.35, 1);
        cnv.pop();
    }

    drawLegLeft() {
        const xOffset = this.vel.x !== 0 ? 0 : 3;
        const shoeWidth = this.vel.x !== 0 ? 5 : 3;
        cnv.push();
        cnv.translate(xOffset, 11.45);

        cnv.fill('#ff0000ff');
        cnv.rotate(radians(this.angle.leg.left));
        cnv.rect(0, 7, 1.8, 16, 99);

        cnv.fill('#8f7657ff');
        cnv.rect(this.vel.x * 1.5, 15.3, shoeWidth, 2, 0.5);

        cnv.fill('#ecececff');
        cnv.rect(0, 2, 1.8, 2.5);
        cnv.rect(0, 6.5, 1.8, 2.5);
        cnv.rect(0, 11, 1.8, 2.5);
        cnv.pop();
    }

    drawLegRight() {
        const xOffset = this.vel.x !== 0 ? 0 : -3;
        const shoeWidth = this.vel.x !== 0 ? 5 : 3;
        cnv.push();
        cnv.translate(xOffset, 11.45)

        cnv.fill('#00ff00ff');
        cnv.rotate(radians(this.angle.leg.right));
        cnv.rect(0, 7, 1.8, 16, 99);

        cnv.fill('#8f7657ff');
        cnv.rect(this.vel.x * 1.5, 15.3, shoeWidth, 2, 0.5);

        cnv.fill('#ecececff');
        cnv.rect(0, 2, 1.8, 2.5);
        cnv.rect(0, 6.5, 1.8, 2.5);
        cnv.rect(0, 11, 1.8, 2.5);
        cnv.pop();
    }

    move() {
        const speedUpgrades = Game.upgrades['speed'].amount;
        const speed = this.speed + speedUpgrades * 1;

        if (!this.dash.dashing) {
            this.vel.x = leftKeyDown ? -1 : rightKeyDown ? 1 : 0;
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

    static spacePressed() {
        if (Game.upgrades.dash.amount === 0) return
        if (!Game.roundHasStarted) return
        // upgrades reduce cooldown by 10
        const effective = elf.getEffectiveDashCooldown();
        const endFrame = elf.dash.startFrameCount + effective;

        if (!elf.dash.dashing && frameCount >= endFrame && elf.vel.x !== 0) {
            elf.dash.dashing = true;
            elf.dash.startFrameCount = frameCount;
        }
    }

    drawDashCoolDown() {
        const effective = this.getEffectiveDashCooldown();
        const passed = frameCount - this.dash.startFrameCount;

        const maxW = 40;
        const w = map(passed, 0, effective, maxW, 0, true); // true = clamp

        cnv.rectMode(CORNER);
        cnv.fill('#ffffffa6');
        cnv.rect(-maxW / 2, -30, w, 5.5);
        cnv.rectMode(CENTER);
    }

    checkEndOfDash() {
        if (frameCount - this.dash.startFrameCount >= this.dash.duration) {
            elf.dash.dashing = false;
        }
    }
}
