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

    static createUiButtons() {
        const centerX = width / 2;
        const centerY = height / 2;
        const w = 500;
        const h = 100;
        new Button('intern', 'Hire Intern', centerX, centerY - h * 2, w, h)
        new Button('dash', 'Unlock Dash', centerX, centerY - h, w, h)
        new Button('speed', 'Speed', centerX, centerY, w, h)
        new Button('health', 'Health', centerX, centerY + h, w, h)
        new Button('start', 'Start Game', centerX, centerY + h * 2, w, h)
    }

    isHovered() {
        const mouseXIsIn = mouseX >= this.x - this.width / 2 && mouseX <= this.x + this.width / 2;
        const mouseYIsIn = mouseY >= this.y - this.height / 2 && mouseY <= this.y + this.height / 2;
        if (mouseXIsIn && mouseYIsIn) return true
    }

    static getClickedButtonName() {
        if (Game.round.counter === 1) {
            if (this.buttons[4].isHovered()) return this.buttons[4].name;
            return false
        }
        for (let button of this.buttons) {
            if (button.isHovered()) return button.name;
        }
        return false
    }

    static drawMenu() {
        if (Game.round.counter === 1) {
            drawMenuWelcome();
            this.buttons[4].y = height / 2;
            drawMenuButton(this.buttons[4]);

            return
        }
        if (Game.round.counter === 2) {
            this.buttons[4].y = height / 2 + 200;
            this.buttons[4].text = 'Continue Game'
        };

        for (let button of this.buttons) {
            drawMenuButton(button);
        }
    }

}
