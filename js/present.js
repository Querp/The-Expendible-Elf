class Present {
    static presents = [];
    static dropRate = 240;
    static timeToDespawn = 150;
    static fallSpeed = 1.45;

    constructor() {
        let dropHeight = height * -0.05;
        // dropHeight = height * 0.65;
        const rubbleRange = 15;

        this.pos = { x: random(width), y: dropHeight };
        this.color = color(random([0, 325, 210, 107, 48]), 50, 50, 1.0);
        this.hasBeenCaught = false;
        this.hasBeenCaughtAtFrameCount;
        this.hasFallenToTheFloor = false;
        this.rubblePositions = [random(-rubbleRange, rubbleRange), random(-rubbleRange, rubbleRange), random(-rubbleRange, rubbleRange)];
        // 'hsla(325, 50%, 50%, 1.00)'
        // 'hsla(210, 50%, 50%, 1.00)'
        // 'hsla(107, 50%, 50%, 1.00)'
        // 'hsla(48, 50%, 50%, 1.00)'

        Present.presents.push(this);
    }

    static update() {
        this.updatePresentSpawn();

        for (let p of this.presents) {
            p.despawn();
            p.move();
            drawPresent(p);
        };
    }

    static updatePresentSpawn() {
        const elapsed = frameCount - Game.roundStartFrameCount;

        Game.spawnInterval = max(45, 200 - elapsed * 0.03);
        // Game.spawnInterval = 1;

        if (frameCount >= Game.nextPresentFrame) {
            new Present();
            Game.nextPresentFrame = frameCount + Game.spawnInterval;
        }
    }

    getRemainingTimeToDespawn() {
        return frameCount - this.hasBeenCaughtAtFrameCount;
    }

    despawn() {
        if (this.hasBeenCaughtAtFrameCount) {
            const elapsedTime = frameCount - this.hasBeenCaughtAtFrameCount;
            if (elapsedTime > Present.timeToDespawn) {
                this._markedForDeletion = true;
            }
        }
    }

    move() {
        if (this.hasBeenCaught && this.pos.y > height - 200) {
            this.pos.y -= 0.5;
        }
        if (this.hasFallenToTheFloor || this.hasBeenCaught) return
        if (this.pos.y < height - 25) {
            this.pos.y += Present.fallSpeed;
        } else {
            this.pos.y = height - 25;
        }

        // has present hit floor?
        if (this.pos.y === height - 25) {
            this.hasFallenToTheFloor = true;
            if (!Game.roundHasStarted) return
            Game.health -= 250
            return
        }

        // is present not close to hitting floor?
        if (this.pos.y < height - 70) {
            return
        }

        // is there an elf below?
        const distance = abs(this.pos.x - elf.pos.x);

        // present caught!
        if (distance < 26) {
            this.hasBeenCaught = true;
            this.hasBeenCaughtAtFrameCount = frameCount;
            // elf.gotHitByPresent(); 
            Game.balance += 50;
        }
    }

    static drawAllPresents() {
        for (let present of this.presents) {
            drawPresent(present);
        }
    }

    static getCaughtAmount() {
        let amount = 0;
        for (let present of this.presents) {
            if (present.hasBeenCaught) amount++
        }
        return amount
    }

    static getDroppedAmount() {
        let amount = 0;
        for (let present of this.presents) {
            if (present.hasFallenToTheFloor) amount++
        }
        return amount
    }

}


