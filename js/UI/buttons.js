class Buttons {
    constructor() {
        this.buttons = {};
    }

    createButtons() {
        const centerX = width / 2;
        const centerY = height / 2;
        const w = 250;
        const h = 260;
        const buttons = [
            new Button('health', 'Health', centerX - w / 2, centerY - 195, w, h),
            new Button('speed', 'Speed', centerX + w / 2, centerY - 195, w, h),
            new Button('dash', 'Unlock Dash', centerX - w / 2, centerY + 65, w, h),
            new Button('intern', 'Intern', centerX + w / 2, centerY + 65, w, h),
            new Button('start', 'Start Game', centerX, centerY, w*2, 100),
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
            
            this.buttons.start.y = height / 2 + 250;
            this.buttons.start.text = 'Continue Game';
        };

        for (const key of Object.keys(this.buttons)) {
            const button = this.buttons[key];
            drawMenuButton(button);
        }
    }
}