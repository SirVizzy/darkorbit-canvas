import { startAnimationLoop } from "./animation";
import { setupCanvas } from "./canvas";
import { bindControlListeners } from "./controls";
import { save } from "./save";
import { isGamePaused, pauseGame, resumeGame } from "./state";

setupCanvas();
bindControlListeners();
startAnimationLoop();

window.addEventListener("beforeunload", save);

// if player hits b key spawn a dialog
window.addEventListener("keydown", (event) => {
  if (event.key === "p") {
    if (isGamePaused()) {
      resumeGame();
    } else {
      pauseGame();
    }
  }
});
