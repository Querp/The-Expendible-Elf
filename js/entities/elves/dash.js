const ElfDash = {
    dash(elf) {
        if (!Dash.dashing) return;
        elf.vel.x = elf.acc.x * 10;
    },
    dashCombo(elf) {
        if (!Dash.dashing || elf.type !== 'player') return;
        Dash.isDashBlockingInput = false;
        Dash.resetCooldown();
    }
};