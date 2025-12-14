class Message {
    static messages = [];
    static maxFramesVisible = 300;

    constructor(text, type = 'default') {
        this.text = text;
        this.type = type;
        this.creationFrameCount = frameCount;
        Message.messages.push(this);
    }

    static update() {
        if (this.messages.length === 0) return

        const oldestMessageCreationFrameCount = this.messages[0].creationFrameCount;
        const framesVisible = frameCount - oldestMessageCreationFrameCount;

        // remove the oldest message
        if (framesVisible > this.maxFramesVisible) {
            this.messages.shift();
        }

        let y = 0;
        for (let i = this.messages.length - 1; i >= 0; i--) {
            // for (let i = 0; i < this.messages.length; i++) {
            const msg = this.messages[i];
            this.drawMessage(msg, y);
            y++;
        }

    }
    static drawMessage(msg, i) {
        const x = 35;
        const y = 180 + i * 32;
        cnv.textAlign(LEFT);
        cnv.noStroke();
        cnv.textSize(25);
        
        cnv.fill('#fff');
        if (msg.type === 'success') cnv.fill('#0f0')
        if (msg.type === 'warning') cnv.fill('#f00')

        cnv.text(msg.text, x, y);

        cnv.textAlign(CENTER)
    }
}