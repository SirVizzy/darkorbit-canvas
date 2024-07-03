import { startAnimationLoop } from "./animation";
import { setupCanvas } from "./canvas";
import { bindControlListeners } from "./controls";
import { save } from "./save";
import { isGamePaused, pauseGame, resumeGame } from "./state";

setupCanvas();
bindControlListeners();
startAnimationLoop();

window.addEventListener("beforeunload", save);

window.addEventListener("keydown", (event) => {
  if (event.key === "p") {
    if (isGamePaused()) {
      resumeGame();
    } else {
      pauseGame();
    }
  }

  if (event.key === "s") {
    ensureGameIsPaused();
    openShop();
  }
});

const ensureGameIsPaused = () => {
  if (!isGamePaused()) {
    pauseGame();
  }
};

const openShop = () => {
  const shop = document.getElementById("shop") as HTMLDialogElement;
  if (shop) {
    shop.showModal();

    const callback = () => {
      resumeGame();
      console.log("Shop closed");
    };

    shop.addEventListener("close", callback, { once: true });
  }
};
