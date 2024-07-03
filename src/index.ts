import { startAnimationLoop } from "./animation";
import { setupCanvas } from "./canvas";
import { bindControlListeners } from "./controls";
import { save } from "./save";

setupCanvas();
bindControlListeners();
startAnimationLoop();

window.addEventListener("beforeunload", save);
