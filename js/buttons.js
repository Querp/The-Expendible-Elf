class Buttons {
    constructor() {
        this.buttons = {};
    }

    createButtons() {
        const centerX = width / 2;
        const centerY = height / 2;
        const w = 500;
        const h = 100;
        const buttons = [
            new Button('intern', 'Hire Intern', centerX, centerY - h * 2, w, h),
            new Button('dash', 'Unlock Dash', centerX, centerY - h, w, h),
            new Button('speed', 'Speed', centerX, centerY, w, h),
            new Button('health', 'Health', centerX, centerY + h, w, h),
            new Button('start', 'Start Game', centerX, centerY + h * 2, w, h),
        ];

        for (const button of buttons) {
            this.buttons[button.name] = button;
        }
    }


    getClickedButtonName() {
        if (game.gameState.round.counter === 1) {
            if (this.buttons.start.isHovered()) return this.buttons.start.name;
            return null
        }
        for (const key of Object.keys(this.buttons)) {
            const button = this.buttons[key];
            if (button.isHovered()) return button.name;
        }
        return null
    }

    drawMenu() {
        if (game.gameState.round.counter === 1) {
            drawMenuWelcome();
            this.buttons.start.y = height / 2;
            drawMenuButton(this.buttons.start);
            return
        }
        if (game.gameState.round.counter === 2) {
            this.buttons.start.y = height / 2 + 200;
            this.buttons.start.text = 'Continue Game';
        };

        for (const key of Object.keys(this.buttons)) {
            const button = this.buttons[key];
            drawMenuButton(button);
        }
    }
}