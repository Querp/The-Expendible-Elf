class Elf {
    static elves = [];
    
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
        
        Elf.elves.push(this);
    }

    update() {
        calcElfLimbAngles(this);
        calcElfSelfAngle(this);
        Dash.checkEndOfDash();
        elf.move();
        drawElf(this);
    }

    move() {
        const speedUpgrades = Game.upgrades['speed'].amount;
        const speed = this.speed + speedUpgrades * 1;

        if (!Dash.dashing) {
            this.vel.x = keyIsDown(LEFT_ARROW) ? -1 : keyIsDown(RIGHT_ARROW) ? 1 : 0;
            this.pos.x += this.vel.x * speed * (this.scalar * 0.15);
        } else {
            // DASH
            const dashSpeed = (this.vel.x * 10) * (speed / 5) * (this.scalar * 0.15) * Dash.speed;
            this.pos.x += dashSpeed;
        }

        if (this.pos.x < 12 || this.pos.x > width - 12) {
            this.vel.x = 0;
            if (Dash.dashing) {
                Dash.dashing = false;
            }
        }
        this.pos.x = constrain(this.pos.x, 12, width - 12);
    }

    // Dash
    static spacePressed() {
        if (Game.upgrades.dash.amount === 0) return
        if (!Game.round.hasStarted) return

        const effective = Dash.getEffectiveDashCooldown();
        const endFrame = Dash.startFrameCount + effective;

        if (!Dash.dashing && frameCount >= endFrame && elf.vel.x !== 0) {
            Dash.dashing = true;
            Dash.startFrameCount = frameCount;
        }
    }

}
