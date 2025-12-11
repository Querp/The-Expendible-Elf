class Button {
    static buttons = [];

    constructor(name, text, x, y, w, h) {
        this.name = name;
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.active = true;
        Button.buttons.push(this)
    }

    isHovered() {
        const mouseXIsIn = mouseX >= this.x - this.width / 2 && mouseX <= this.x + this.width / 2;
        const mouseYIsIn = mouseY >= this.y - this.height / 2 && mouseY <= this.y + this.height / 2;
        if (mouseXIsIn && mouseYIsIn) return true
    }

    draw() {
        // outline
        cnv.fill('#c3c3c3ff');
        if (this.isHovered()) cnv.fill('#fff')
        cnv.strokeWeight(3);
        cnv.stroke('#222')
        cnv.rect(this.x, this.y, this.width, this.height)

        // title
        cnv.textSize(25)
        cnv.fill('#000')
        cnv.noStroke();
        if (this.name === 'start') {
            cnv.textSize(35)
            cnv.text(this.text, this.x, this.y - 4)
            cnv.textSize(10)
            cnv.text('[ ENTER ]', this.x, this.y + 18)
            return
        }
        cnv.noStroke();
        cnv.text(this.text, this.x, this.y - 8)


        // cost
        const price = `$ ${Game.upgrades[this.name].price}`;
        cnv.textSize(15)
        cnv.text(price, this.x, this.y + 15)

        // amount
        const amount = Game.upgrades[this.name].amount;
        cnv.textSize(25)
        cnv.text(amount, this.x - 150, this.y)

        // stat value
        let statValue;
        cnv.textSize(25)
        if (this.name === 'intern') statValue = Game.upgrades[this.name].amount;
        if (this.name === 'dash') statValue = `${3 - Game.upgrades[this.name].amount * 0.5}s`;
        if (this.name === 'speed') statValue = `${elf.speed + Game.upgrades[this.name].amount}vel`;
        if (this.name === 'health') statValue = `${Game.health + Game.upgrades[this.name].amount * 100}`;
        cnv.text(statValue, this.x + 150, this.y)
    }

    static getClickedButtonName() {
        if (Game.roundCounter === 1) {
            if (this.buttons[4].isHovered()) return this.buttons[4].name;
            return false
        }
        for (let button of this.buttons) {
            if (button.isHovered()) return button.name;
        }
        return false
    }

    static drawUpgradeMenu() {
        if (Game.roundCounter === 1) {
            cnv.textSize(90)
            cnv.fill('#ddd')
            cnv.text('The Expendible Elf', width / 2, 150)
            this.buttons[4].y = height / 2;
            this.buttons[4].draw();
            return
        }
        if (Game.roundCounter === 2) {
            this.buttons[4].y = height / 2 + 200
            this.buttons[4].text = 'Continue Game'
        };

        for (let button of this.buttons) {
            button.draw();
        }
    }
}
