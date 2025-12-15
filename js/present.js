class Present {
    static presents = [];
    static dropRate = 240;
    static timeToDespawn = 150;
    static fallSpeed = 1.45;
    static colorHues = { pink: 325, blue: 210, green: 107, yellow: 48 };
    static priceWhenCaught = 50;
    // 'hsla(325, 50%, 50%, 1.00)' 'hsla(210, 50%, 50%, 1.00)' 
    // 'hsla(107, 50%, 50%, 1.00)' 'hsla(48, 50%, 50%, 1.00)'

    constructor() {
        const rubbleRange = 15;
        let dropHeight = -10;
        dropHeight = height * 0.8;

        this.pos = { x: random(width), y: dropHeight };
        this.color = this.getRandomPresentColor();
        this.hasBeenCaught = false;
        this.hasBeenCaughtAtFrameCount;
        this.hasFallenToTheFloor = false;
        this.rubblePositions = [random(-rubbleRange, rubbleRange), random(-rubbleRange, rubbleRange), random(-rubbleRange, rubbleRange)];

        Present.presents.push(this);
    }

    getRandomPresentColor() {
        const keys = Object.keys(Present.colorHues);
        const randomKey = random(keys);
        const hue = Present.colorHues[randomKey]
        return color(hue, 50, 50, 1.0);
    }

    static update() {
        this.updatePresentSpawn();

        for (let p of this.presents) {
            p.despawn();
            p.move();
            drawPresent(p);
        };

        this.presents = this.presents.filter(p => !p._markedForDeletion);
    }

    static updatePresentSpawn() {
        const elapsed = frameCount - Game.round.startFrameCount;

        Game.present.spawnInterval = max(45, 200 - elapsed * 0.03);
        // Game.present.spawnInterval = 30;

        if (frameCount >= Game.present.nextPresentFrame) {
            new Present();
            Game.present.nextPresentFrame = frameCount + Game.present.spawnInterval;
        }
    }

    getElapsedTimeSinceCatch() {
        return frameCount - this.hasBeenCaughtAtFrameCount;
    }

    despawn() {
        if (this.hasBeenCaughtAtFrameCount) {
            if (this.getElapsedTimeSinceCatch() > Present.timeToDespawn) {
                this._markedForDeletion = true;
            }
        }
    }

    move() {
        if (this.hasBeenCaught) {
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
            if (!Game.round.hasStarted) return
            Game.health -= 250
            return
        }

        // is present not close to hitting floor?
        if (this.pos.y < height - 70) {
            return
        }

        // check if there is elf to catch
        if (this.isThereElfBelow()) {
            this.hasBeenCaught = true;
            this.hasBeenCaughtAtFrameCount = frameCount;
            // elf.gotHitByPresent(); 
            Game.balance += Present.priceWhenCaught;
        }
    }

    isThereElfBelow() {
        for (let elf of Elf.elves) {
            const distance = abs(this.pos.x - elf.pos.x);
            if (distance < 26) return true
        }
        return false
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


