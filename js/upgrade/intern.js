class Intern {
    static lastPlacedIndex = 0;

    static placeIntern(x) {
        const internsAllowed = game.upgrades.upgrades.intern.amount;
        const interns = game.elves.elves.filter(e => e.type === 'intern');

        if (interns.length < internsAllowed) {
            const player = game.elves.getPlayer();
            const intern = new Elf('intern', x, player.pos.y, 2.5);
            game.elves.add(intern);
            return;
        }

        this.lastPlacedIndex = (this.lastPlacedIndex + 1) % interns.length;
        interns[this.lastPlacedIndex].pos.x = x;
    }

    static prepareNextRound() {
        game.elves.elves = game.elves.elves.filter(e => e.type === 'player');
        this.lastPlacedIndex = 0;
    }

    static getInternAmount(){
        const interns = game.elves.elves.filter(e => e.type === 'intern');
        return interns.length
    }
}
