class GameInput {
    static handleButtonClick(buttonName, state, loop) {
        if (!buttonName || state.round.hasStarted) return;

        if (buttonName === 'start') {
            state.round.hasStarted = true;
            loop.prepareNextRound();
            return;
        }

        if (Upgrade.isUpgradeMaxed(buttonName)) return;

        // Rename dash button if first purchase
        if (buttonName === 'dash' && game.upgrades.upgrades.dash.amount === 0) {
            game.buttons.buttons.dash.text = "Upgrade Dash Cooldown";
        }

        loop.buyUpgrade(buttonName);
    }

    static handleDownArrow() {
        const player = game.elves.getPlayer();
        Intern.placeIntern(player.pos.x);
    }

    static handleEnter(state, loop) {
        if (!state.round.hasStarted) {
            state.round.hasStarted = true;
            loop.prepareNextRound();
        }
    }

    static handleSpace() {
        Elf.spacePressed()
    }
}
