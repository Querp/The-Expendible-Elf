class Present {
    static FLOOR_Y_OFFSET = 25;
    static CATCH_CHECK_HEIGHT = 70;

    static fallSpeed = 1.45;
    static priceWhenCaught = 50;
    static timeToDespawn = 150;
    static colorHues = { pink: 325, blue: 210, green: 107, yellow: 48 };
    // 'hsla(325, 50%, 50%, 1.00)' 'hsla(210, 50%, 50%, 1.00)' 
    // 'hsla(107, 50%, 50%, 1.00)' 'hsla(48, 50%, 50%, 1.00)'

    constructor() {
        const rubbleRange = 15;
        let dropHeight = -10;
        // dropHeight = height * 0.98;

        this.pos = { x: random(width), y: dropHeight };
        this.color = this.getRandomPresentColor();
        this.hasBeenCaught = false;
        this.hasBeenCaughtAtFrameCount = null;
        this.hasFallenToTheFloor = false;
        this.rubblePositions = [random(-rubbleRange, rubbleRange), random(-rubbleRange, rubbleRange), random(-rubbleRange, rubbleRange)];
        this.markedForDeletion = false;
        this.radius = 10;
    }

    getRandomPresentColor() {
        const keys = Object.keys(Present.colorHues);
        const randomKey = random(keys);
        const hue = Present.colorHues[randomKey]
        return color(hue, 50, 50, 1.0);
    }

    getElapsedTimeSinceCatch() {
        return frameCount - this.hasBeenCaughtAtFrameCount;
    }

    despawn() {
        if (this.hasBeenCaughtAtFrameCount !== null) {
            if (this.getElapsedTimeSinceCatch() > Present.timeToDespawn) {
                this.markedForDeletion = true;
            }
        }
    }

    move() {
        if (this.hasBeenCaught) {
            this.pos.y -= 0.5;
        }
        if (this.hasFallenToTheFloor || this.hasBeenCaught) return
        if (this.pos.y < height - Present.FLOOR_Y_OFFSET) {
            this.pos.y += Present.fallSpeed;
        } else {
            this.pos.y = height - Present.FLOOR_Y_OFFSET;
        }

        // has present hit floor?
        if (this.pos.y === height - Present.FLOOR_Y_OFFSET) {
            this.hasFallenToTheFloor = true;
            if (!game.gameState.round.hasStarted) return
            game.gameState.health -= 250
            return
        }

        // is present not close to hitting floor?
        if (this.pos.y < height - Present.CATCH_CHECK_HEIGHT) {
            return
        }
    }

    catch() {
        if (this.hasBeenCaught || this.hasFallenToTheFloor) return 0;

        this.hasBeenCaught = true;
        this.hasBeenCaughtAtFrameCount = frameCount;

        return Present.priceWhenCaught;
    }

}
