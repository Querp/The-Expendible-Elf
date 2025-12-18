class Elf {
    static CATCH_RANGE = 26

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
        this.height = 55; // at scale 1.0
        this.radius = 15;
        this.placeElfAtFloor();
    }

    placeElfAtFloor() {
        const FLOOR_Y = height - 20;
        const elfHeight = this.height * this.scalar;
        this.pos.y = FLOOR_Y - elfHeight / 2;
    }

    update() {
        calcElfLimbAngles(this);
        calcElfSelfAngle(this);
        if (this.type === 'player') {
            this.move();
            this.dash();
            this.checkWalls();
        }
        this.catchPresent();
    }

    move() {
        if (Dash.dashing) return
        const speed = this.getSpeed();
        this.pos.x += this.vel.x * speed * (this.scalar * 0.15);
    }

    updateVel(direction) {
        if (Dash.isDashBlockingInput) return

        if (Dash.dashing) {
            if (direction === 'left') this.vel.x = -1;
            if (direction === 'right') this.vel.x = 1;
            Dash.isDashBlockingInput = true
        } else {
            this.vel.x = direction === 'left' ? -1 : direction === 'right' ? 1 : 0;
        }
    }

    dash() {
        if (!Dash.dashing) return
        this.pos.x += this.getDashSpeed();
    }

    checkWalls() {
        const wallOffset = 12;
        if (!Dash.dashing) {
            if (this.pos.x < wallOffset || this.pos.x > width - wallOffset) {
                this.vel.x = 0;
            }
            this.pos.x = constrain(this.pos.x, wallOffset, width - wallOffset);
            return
        }
        // loop player to other side of screen
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.x > width) this.pos.x = 0;
    }

    getSpeed() {
        const speedUpgradesAmount = game.upgrades.upgrades['speed'].amount;
        return this.speed + speedUpgradesAmount * 1;
    }

    getDashSpeed() {
        const speed = this.getSpeed();
        return (this.vel.x * 10) * (speed / 5) * (this.scalar * 0.15) * Dash.speed;
    }

    catchPresent() {
        for (let present of game.presents.presents) {
            const distance = dist(this.pos.x, this.pos.y, present.pos.x, present.pos.y);
            const minDistance = present.radius + this.radius * this.scalar;
            if (distance < minDistance && !present.hasFallenToTheFloor) {
                this.dashCombo();
                const value = present.catch();
                game.gameState.balance += value;
                // this.scalar += 0.01;
                // this.placeElfAtFloor();
            }
        }
    }

    dashCombo() {
        if (!Dash.dashing) return
        if (this.type !== 'player') return

        // allow redirection of dash for 1 frame
        Dash.isDashBlockingInput = false;
        Dash.resetCooldown();
    }

    static spacePressed() {
        if (game.upgrades.upgrades.dash.amount === 0) {
            game.messages.addMessage('🐱‍🏍 Dash is not available', 'warning');
            return
        }
        if (!game.gameState.round.hasStarted) return

        const effective = Dash.getEffectiveDashCooldown();
        const endFrame = Dash.startFrameCount + effective;
        const player = game.elves.getPlayer();

        if (Dash.dashing) {
            Dash.endDash();
        }
        if (!Dash.dashing && frameCount >= endFrame && player.vel.x !== 0) {
            Dash.dashing = true;
            Dash.isDashBlockingInput = true;
            Dash.startFrameCount = frameCount;
            console.log('dash!');
        }
    }
}
