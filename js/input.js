class Input {

    constructor(name, keyCode, action = 'press') {
    this.name = name;
    this.keyCode = keyCode;
    this.action = action; // 'press' | 'down'
  }

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
            game.buttons.buttons.dash.text = "Dash";
        }

        loop.buyUpgrade(buttonName);
    }

}
