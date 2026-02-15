// TODO: handle resizing
import { Prompt } from "./prompt.js";
import { Confetti } from "./confetti.js";

const state = {
    gameOver: false,
    pt: undefined,
    ptIndex: 0,
    ptList: [],
    canvas: undefined,
    context: undefined,
    confetti: undefined,
};

function keyDown (event) {
    let finished = false;
    if(!event.repeat)
        finished = state.pt.tryChar(event.key);
    if(finished) {
        if(!state.gameOver) {
            if(state.ptIndex < (state.ptList.length - 1)) {
                state.ptIndex++;
                state.pt = new Prompt(state.ptList[state.ptIndex].text, state.ptList[state.ptIndex].timer, state.ptList[state.ptIndex].effect, state.canvas);
            }
            else {
                state.gameOver = true;
                state.pt = new Prompt("You Win!", -1, null, state.canvas);
            }
            state.confetti = new Confetti(state.canvas);
        }
        else {
            state.ptIndex = 0;
            state.pt = new Prompt(state.ptList[state.ptIndex].text, state.ptList[state.ptIndex].timer, state.ptList[state.ptIndex].effect, state.canvas);
            state.gameOver = false;
        }
    }
};

function mainLoop() {
    window.requestAnimationFrame(mainLoop);
    state.context.clearRect(0, 0, state.canvas.width, state.canvas.height);
    if(!state.gameOver && state.pt.timeLeft > 0) {
        if(state.pt.timeLeft > 300)
            state.context.fillStyle = "#0a9f0a";
        else if(state.pt.timeLeft > 150)
            state.context.fillStyle = "#e26c12"
        else
            state.context.fillStyle = "#e80c0c";
        state.context.fillRect(0, 0, (state.pt.timeLeft / state.pt.startTime) * (state.canvas.width / 2), state.canvas.height);
    }
    state.pt.render(state.context);
    state.pt.timeLeft--;
    if(state.pt.timeLeft == 0) {
        state.gameOver = true;
        state.pt = new Prompt("Time's up!", -1, null, state.canvas);
    }
    if(state.confetti)
        state.confetti.doTheThing(state.context);
};

state.canvas = document.getElementById("COOL_RENDERING_CONTEXT");
state.context = state.canvas.getContext("2d");

window.devicePixelRatio = 2;
state.canvas.width = Math.floor(1280 * window.devicePixelRatio);
state.canvas.height = Math.floor(720 * window.devicePixelRatio);
state.context.scale(window.devicePixelRatio, window.devicePixelRatio);
state.context.font = "48px serif";
document.addEventListener("keydown", keyDown);

const hr = new XMLHttpRequest();
hr.overrideMimeType("application/json");
hr.open("GET", "./prompts.json", true);
hr.addEventListener("load", () => {
    console.assert(hr.status === 0 || (hr.status >= 200 && hr.status < 400))
    state.ptList = JSON.parse(hr.responseText);
    state.pt = new Prompt(state.ptList[state.ptIndex].text, state.ptList[state.ptIndex].timer, null, state.canvas);
    mainLoop();
});
hr.send();