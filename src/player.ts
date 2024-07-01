import { Player } from "./entities/Player.Entity";
import { room } from "./state";

export const player = new Player();

player.setRoom(room);
