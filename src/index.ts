import { startAnimationLoop } from "./animation";
import { setupCanvas } from "./canvas";
import { LF1, LF2, LF3 } from "./components/Inventory";
import { bindControlListeners } from "./controls";
import { player } from "./player";
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
    const buyables = document.getElementById("buyables") as HTMLDivElement;

    // clear the buyables list
    buyables.innerHTML = "";

    // create a list of buyable items
    const items = [new LF1(), new LF2(), new LF3()];

    // add each item to the buyables list
    items.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.textContent = `${item.name} - ${item.damage} damage`;
      buyables.appendChild(itemElement);
    });

    shop.showModal();

    const uridium = document.getElementById("uridium") as HTMLSpanElement;
    const credits = document.getElementById("credits") as HTMLSpanElement;

    uridium.textContent = player.bank.uridium.toString();
    credits.textContent = player.bank.credits.toString();

    const callback = () => {
      resumeGame();
    };

    shop.addEventListener("close", callback, { once: true });
  }
};
