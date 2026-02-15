class Prompt {
    constructor(prompt, timer, effect, canvas) {
        this.left = prompt;
        this.correct = "";
        this.startTime = timer;
        this.timeLeft = timer;
        this.effect = effect;
        this.x = canvas.width / 4;
        this.y = canvas.height / 4;
        if(this.effect == "wiggle" || this.effect == "wiggle_x" || this.effect == "wiggle_xy")
            this.chars = {left: [...this.left], correct: [...this.correct]};
    }
    tryChar(keyCode) {
        if(this.left.slice(0, 1) === keyCode) {
            this.correct += this.left.slice(0, 1);
            this.left = this.left.slice(1);
            if(this.effect == "wiggle" || this.effect == "wiggle_x" || this.effect == "wiggle_xy")
                this.chars = {left: [...this.left], correct: [...this.correct]};
        }
        return (this.left == "");
    }
    render(context) {
        switch(this.effect) {
            case "wiggle": {
                let xOffset = 0;
                context.fillStyle = "#0a9f0a";
                let i = 0;
                for(let c of this.chars.correct) {
                    let yOffset = Math.cos((this.startTime - this.timeLeft) / 4) * (25 + (i % 3) * 8);
                    context.fillText(c, this.x + xOffset, this.y + yOffset);
                    xOffset += context.measureText(c).width;
                    ++i;
                }
                context.fillStyle = "#000000";
                i = 0;
                for(let c of this.chars.left) {
                    let yOffset = Math.cos((this.startTime - this.timeLeft) / 4) * (25 + (i % 3) * 8);
                    context.fillText(c, this.x + xOffset, this.y + yOffset);
                    xOffset += context.measureText(c).width;
                    ++i;
                }
            } break;
            case "wiggle_x": {
                context.fillStyle = "#0a9f0a";
                let xOffset = 0;
                let i = 0;
                for(let c of this.chars.correct) {
                    xOffset += Math.cos((this.startTime - this.timeLeft) / 6) * (20 + (i % 3) * 4);
                    context.fillText(c, this.x + xOffset, this.y);
                    xOffset += context.measureText(c).width;
                    ++i;
                }
                context.fillStyle = "#000000";
                i = 0;
                for(let c of this.chars.left) {
                    xOffset += Math.cos((this.startTime - this.timeLeft) / 6) * (20 + (i % 3) * 4);
                    context.fillText(c, this.x + xOffset, this.y);
                    xOffset += context.measureText(c).width;
                    ++i;
                }
            } break;
            case "wiggle_xy": {
                context.fillStyle = "#0a9f0a";
                let xOffset = 0;
                let i = 0;
                for(let c of this.chars.correct) {
                    let yOffset = Math.cos((this.startTime - this.timeLeft) / 8) * (20 + (i % 3) * 4);
                    xOffset += Math.cos((this.startTime - this.timeLeft) / 8) * (20 + (i % 3) * 4);
                    context.fillText(c, this.x + xOffset, this.y + yOffset);
                    xOffset += context.measureText(c).width;
                    ++i;
                }
                context.fillStyle = "#000000";
                i = 0;
                for(let c of this.chars.left) {
                    let yOffset = Math.cos((this.startTime - this.timeLeft) / 8) * (20 + (i % 3) * 4);
                    xOffset += Math.cos((this.startTime - this.timeLeft) / 8) * (20 + (i % 3) * 4);
                    context.fillText(c, this.x + xOffset, this.y + yOffset);
                    xOffset += context.measureText(c).width;
                    ++i;
                }
            } break;
            case "fade": {
                context.globalAlpha = (this.timeLeft / this.startTime) / 2;
                context.fillStyle = "#000000";
                context.fillText(this.left, this.x + context.measureText(this.correct).width, this.y);
                context.fillStyle = "#0a9f0a";
                context.fillText(this.correct, this.x, this.y);
                context.globalAlpha = 1.0;           
            } break;
            default: {
                context.fillStyle = "#000000";
                context.fillText(this.left, this.x + context.measureText(this.correct).width, this.y);
                context.fillStyle = "#0a9f0a";
                context.fillText(this.correct, this.x, this.y);
            } break;
        }
    }
};

export { Prompt };