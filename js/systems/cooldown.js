class Cooldown {
    constructor(duration, onFinish){
        this.duration = duration;
        this.onFinish = onFinish;
        this.done = false;
    }

    countDown(){
        if (this.done) return

        this.duration--

        if (this.duration === 0) {
            this.done = true;
            console.log('This counter reached 0', this);
            this.onFinish?.();
        }
    }
}