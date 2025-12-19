class Inputs {
    constructor() {
        this.inputs = {};
        this.state = {};  // bools
    }

    setup() {
        const defs = [
            new Input('LEFT_down', LEFT_ARROW, 'down'),
            new Input('RIGHT_down', RIGHT_ARROW, 'down'),
            new Input('UP_down', UP_ARROW, 'down'),

            new Input('UP', UP_ARROW, 'press'),
            new Input('DOWN', DOWN_ARROW, 'press'),
            new Input('ENTER', ENTER, 'press'),
            new Input('SPACE', 32, 'press'),
            new Input('TAB', 9, 'press'),
        ];

        for (const def of defs) {
            this.inputs[def.name] = def;
            this.state[def.name] = false;
        }
    }

    update() {
        for (const name in this.inputs) {
            const input = this.inputs[name];

            if (input.action === 'down') {
                this.state[name] = keyIsDown(input.keyCode);
            }
        }
    }

    onKeyPressed() {
        for (const name in this.inputs) {
            const input = this.inputs[name];

            if (input.action === 'press' && keyCode === input.keyCode) {
                this.state[name] = true;
            }
        }
    }

    /** One-shot read for press actions */
    consume(name) {
        const active = this.state[name];
        this.state[name] = false;
        return active;
    }

    /** Convenience */
    isDown(name) {
        return !!this.state[name]; 
    }

}