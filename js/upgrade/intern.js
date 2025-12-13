class Intern {
    static interns = [];
    static lastPlacedIndex;


    static drawAllInterns() {
        for (let intern of this.interns) {
            calcElfLimbAngles(intern);
            // calcElfSelfAngle(intern);
            drawElf(intern);
        }
    }
    static placeIntern(x) {
        if (this.interns.length < Upgrade.upgrades.intern.amount) {
            const intern = new Elf('intern', x, elf.pos.y, 1);
            this.lastPlacedIndex = this.interns.length;
            this.interns.push(intern);
            return
        } 

        this.lastPlacedIndex = (this.lastPlacedIndex + 1) % (Upgrade.upgrades.intern.amount);
        this.interns[this.lastPlacedIndex].pos.x = elf.pos.x

    }

    static prepareNextRound() {
        this.interns = [];
        Elf.elves = [Elf.elves[0]];

    }

}