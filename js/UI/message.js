class Message {
    constructor(text, type = 'default') {
        this.text = text;
        this.type = type;
        this.creationFrameCount = frameCount;
    }

    draw(i) {
        const rowHeight = 32;
        const marginInlineStart = 35;
        const marginBlockStart = 180;
        const x = marginInlineStart;
        const y = marginBlockStart + i * rowHeight;

        cnv.textAlign(LEFT);
        cnv.noStroke();
        cnv.textSize(25);
        cnv.fill('#fff');
        if (this.type === 'success') cnv.fill('hsla(120, 53%, 50%, 1.00)')
        if (this.type === 'warning') cnv.fill('hsla(0, 53%, 50%, 1.00)')

        cnv.text(this.text, x, y);

        cnv.textAlign(CENTER)
    }
}