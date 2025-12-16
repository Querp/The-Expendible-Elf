class Presents {
    constructor() {
        this.presents = [];
        this.baseSpawnInterval = 120;
        this.spawnInterval = this.baseSpawnInterval;
        this.spawnSpeedMultiplier = 0.01;
        this.minSpawnInterval = 30;
        this.nextPresentFrame = 0;
    }

    update() {
        if (Game.round.hasStarted) {
            this.spawn();
            this.updatePresents();
            this.cleanup();
        }
        this.draw();
    }

    spawn() {
        const elapsed = frameCount - Game.round.startFrameCount;
        const reduction = elapsed * this.spawnSpeedMultiplier;
        this.spawnInterval = max(this.minSpawnInterval, this.baseSpawnInterval - reduction);
        if (frameCount >= this.nextPresentFrame) {
            this.presents.push(new Present());
            this.nextPresentFrame = frameCount + this.spawnInterval;
        }
    }

    updatePresents() {
        for (const p of this.presents) {
            p.despawn();
            p.move();
        };
    }

    cleanup() {
        this.presents = this.presents.filter(p => !p.markedForDeletion);
    }

    draw() {
        for (const p of this.presents) {
            drawPresent(p);
        }
    }

}