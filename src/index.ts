import { startAnimationLoop } from "./animation";
import { setupCanvas } from "./canvas";
import { bindControlListeners } from "./controls";

setupCanvas();
bindControlListeners();
startAnimationLoop();
