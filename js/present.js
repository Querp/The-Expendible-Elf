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

        Present.presents.push(this)
        // console.log(Present.presents);
    }

    static update() {
        this.updatePresentSpawn();

        for (let p of this.presents) {
            p.despawn()
            p.move()
            p.draw()
        };
    }

    static updatePresentSpawn() {
        const elapsed = frameCount - Game.roundStartFrameCount;

        Game.spawnInterval = max(45, 200 - elapsed * 0.03);
        // Game.spawnInterval = 1;
        // Game.spawnInterval = max(10, 120 - elapsed * 100);

        if (frameCount >= Game.nextPresentFrame) {
            new Present();
            Game.nextPresentFrame = frameCount + Game.spawnInterval;
        }
    }

    static updateAfterRoundEnd() {
        for (let p of Present.presents) {
            p.move();
            p.draw();
        }
    }

    getRemainingTimeToDespawn() {
        return frameCount - this.hasBeenCaughtAtFrameCount
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
        if (this.hasFallenToTheFloor || this.hasBeenCaught) return;
        if (this.pos.y < height - 25) {
            this.pos.y += Present.fallSpeed;
        } else {
            this.pos.y = height - 25;
        }

        // check if present has hit floor
        if (this.pos.y === height - 25) {
            this.hasFallenToTheFloor = true;
            if (!Game.roundHasStarted) return
            // Game.changeHealth(-250)
            Game.health -= 250
            return
        }

        // check if present is not close to hitting floor
        if (this.pos.y < height - 70) {
            return
        }

        // check if there is an elf below
        const distance = abs(this.pos.x - elf.pos.x);

        // present caught!
        if (distance < 26) {
            this.hasBeenCaught = true;
            this.hasBeenCaughtAtFrameCount = frameCount;
            // elf.gotHitByPresent(); 
            Game.balance += 50;
        }
    }

    draw() {
        // draw caught presents on top (loop again)
        cnv.strokeWeight(1);

        // draw Rubble
        if (this.hasFallenToTheFloor) {
            // noStroke();
            cnv.stroke('#000')
            // fill('#d13e3e63');
            cnv.fill('#d13e3eff')
            cnv.fill(this.color)
            cnv.strokeWeight(0.5)
            // noStroke()
            cnv.push();
            cnv.translate(
                this.pos.x + this.rubblePositions[0],
                this.pos.y + 3
            )
            cnv.rotate(25)
            cnv.rect(
                0, 0,
                constrain(this.rubblePositions[1] * 2, 7, 12),
                constrain(this.rubblePositions[2], 7, 12),
            )
            cnv.pop();
            cnv.push();
            cnv.translate(
                this.pos.x + this.rubblePositions[1],
                this.pos.y + 3,
            )
            cnv.rotate(-40)
            cnv.rect(
                0, 0,
                constrain(this.rubblePositions[2], 7, 12),
                constrain(this.rubblePositions[0] * 2, 7, 12),
            )
            cnv.pop();
            cnv.rect(
                this.pos.x + this.rubblePositions[2],
                this.pos.y + 3,
                constrain(this.rubblePositions[0] * 1.5, 7, 12),
                constrain(this.rubblePositions[1] * 1.5, 7, 12),
            )
        } else if (this.hasBeenCaught) {
            const alpha = 1 - (this.getRemainingTimeToDespawn() / Present.timeToDespawn);
            cnv.strokeWeight(1.3)
            // stroke('hsla(48, 96%, 29%, 1.00)')
            // fill('hsla(54, 100%, 50%, 1.00)')
            cnv.stroke(color(48, 96, 29, alpha));
            cnv.fill(color(54, 100, 50, alpha));
            cnv.circle(this.pos.x, this.pos.y, 17)
        } else {
            // stroke(200);
            cnv.strokeWeight(1);
            cnv.stroke('#000');
            cnv.fill('#d13e3eff');
            cnv.fill(this.color);
            cnv.rect(this.pos.x, this.pos.y, 20);
            cnv.fill('#fff');
            cnv.noStroke();
            cnv.rect(this.pos.x, this.pos.y, 20, 2);
            cnv.rect(this.pos.x, this.pos.y, 2, 20);
        }
    }

    static drawAllPresents() {
        for (let present of this.presents) {
            present.draw();
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


