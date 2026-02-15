class Confetti {
    constructor(canvas) {
        this.pos = [];
        this.dir = [];
        for(let i = 0; i < 400; ++i) {
            this.pos.push(canvas.width / 4);
            this.pos.push(canvas.height / 4);
            this.dir.push((Math.random() * 40 - 20) * 15);
            this.dir.push((Math.random() * 40 - 20) * 15);
        }
    }
    doTheThing(context) {
        for(let i = 0; i < 800; i += 2) {
            if(Math.random() * 11 - 5 > 0)
                context.fillStyle = "#dde80c";
            else
                context.fillStyle = "#114fd6";
            context.fillRect(this.pos[i], this.pos[i + 1], 20, 5);
            this.pos[i] += this.dir[i];
            this.pos[i + 1] += this.dir[i + 1];
        }
    }
}

export { Confetti };