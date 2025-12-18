class Messages {
    constructor() {
        this.messages = [];
        this.maxFramesVisible = 300;
    }

    addMessage(text, type) {
        const msg = new Message(text, type);
        this.messages.push(msg)
    }

    update() {
        if (this.messages.length === 0) return

        const oldestMessageCreationFrameCount = this.messages[0].creationFrameCount;
        const framesVisible = frameCount - oldestMessageCreationFrameCount;

        // remove the oldest message
        if (framesVisible > this.maxFramesVisible) {
            this.messages.shift();
        }

        // draw the oldest message on top 
        let y = 0;
        for (let i = this.messages.length - 1; i >= 0; i--) {
            const msg = this.messages[i];
            msg.draw(y);
            y++;
        }
    }
}