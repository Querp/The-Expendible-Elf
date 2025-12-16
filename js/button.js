class Button {
    constructor(name, text, x, y, w, h) {
        this.name = name;
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        // this.active = true;
    }

    isHovered() {
        const mouseXIsIn = mouseX >= this.x - this.width / 2 && mouseX <= this.x + this.width / 2;
        const mouseYIsIn = mouseY >= this.y - this.height / 2 && mouseY <= this.y + this.height / 2;
        return mouseXIsIn && mouseYIsIn;
    }
}
