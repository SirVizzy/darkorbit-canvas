import { Player } from "./entities/Player.Entity";
import { isPlayerInLocalStorage, loadPlayerFromLocalStorage } from "./save";

export const player = isPlayerInLocalStorage()
  ? loadPlayerFromLocalStorage()
  : new Player();
