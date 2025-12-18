class Elves {
    constructor() {
        this.elves = [];
    }

    createPlayer() {
        // const player = new Elf('player', 140, height, 2);
        const player = new Elf('player');
        this.add(player);
        return player
    }

    add(elf) {
        this.elves.push(elf);
    }

    update() {
        Dash.checkEndOfDash();

        for (const elf of this.elves) {
            elf.update();
        }
    }

    draw() {
        for (let i = this.elves.length - 1; i >= 0; i--) {
            const elf = this.elves[i];
            drawElf(elf);
        }
    }

    getPlayer() {
        return this.elves.find(e => e.type === 'player');
    }

    resetPlayerPosition() {
        this.getPlayer().pos.x = width / 2;
    }

}