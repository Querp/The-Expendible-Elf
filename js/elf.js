class Elf {
    constructor(type = 'intern', x = width / 2, y = height - 50, scalar = 1) {
        this.type = type;
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
    }

    update() {
        calcElfLimbAngles(this);
        calcElfSelfAngle(this);
        this.move();
        this.dash();
        this.checkWalls();
    }

    move() {
        if (Dash.dashing) return
        const speed = this.getSpeed();
        this.vel.x = keyIsDown(LEFT_ARROW) ? -1 : keyIsDown(RIGHT_ARROW) ? 1 : 0;
        this.pos.x += this.vel.x * speed * (this.scalar * 0.15);
    }

    dash() {
        if (!Dash.dashing) return
        this.pos.x += this.getDashSpeed();
    }

    checkWalls() {
        if (this.pos.x < 12 || this.pos.x > width - 12) {
            this.vel.x = 0;
            Dash.dashing = false;
        }
        this.pos.x = constrain(this.pos.x, 12, width - 12);
    }

    getSpeed() {
        const speedUpgradesAmount = game.upgrades.upgrades['speed'].amount;
        return this.speed + speedUpgradesAmount * 1;
    }

    getDashSpeed() {
        const speed = this.getSpeed();
        return (this.vel.x * 10) * (speed / 5) * (this.scalar * 0.15) * Dash.speed;
    }

    static spacePressed() {
        if (game.upgrades.upgrades.dash.amount === 0) return
        if (!game.gameState.round.hasStarted) return

        const effective = Dash.getEffectiveDashCooldown();
        const endFrame = Dash.startFrameCount + effective;
        const player = game.elves.getPlayer();

        if (!Dash.dashing && frameCount >= endFrame && player.vel.x !== 0) {
            Dash.dashing = true;
            Dash.startFrameCount = frameCount;
        }
    }

}
