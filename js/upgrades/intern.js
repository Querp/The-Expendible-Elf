class Intern {
    static lastPlacedIndex = 0;
    static internColors = [
        'hsla(282, 43%, 39%, 1.00)',
        'hsla(52, 43%, 39%, 1.00)',
        'hsla(0, 43%, 39%, 1.00)',
        'hsla(171, 43%, 39%, 1.00)',
        'hsla(244, 43%, 39%, 1.00)',
    ]

    static placeIntern(x) {
        const internsAllowed = game.upgrades.upgrades.intern.amount;
        if (internsAllowed === 0) {
            game.messages.addMessage('🎅 No interns available', 'warning');
            return
        };
        
        const interns = game.elves.elves.filter(e => e.type === 'intern');

        if (interns.length < internsAllowed) {
            const player = game.elves.getPlayer();
            const color = this.internColors[interns.length];
            const intern = new Elf('intern', x, player.pos.y, 2.5, color);
            game.elves.add(intern);
            return;
        }

        interns[this.lastPlacedIndex].pos.x = x;
        this.lastPlacedIndex = (this.lastPlacedIndex + 1) % interns.length;
    }
    
    static getNextInternToMove() {
        const interns = game.elves.elves.filter(e => e.type === 'intern');
        if (interns.length === 0) return null;
        return interns[this.lastPlacedIndex];
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
