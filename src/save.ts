import { Player } from "./entities/Player.Entity";
import { player } from "./player";
import { LocalState } from "./types/State";

export const save = () => {
  localStorage.setItem(LocalState.Player, player.serialize());
};

export const loadPlayerFromLocalStorage = () => {
  return Player.deserialize(getPlayerFromLocalStorage());
};

export const isPlayerInLocalStorage = () => {
  return localStorage.getItem(LocalState.Player) !== null;
};

const getPlayerFromLocalStorage = () => {
  return localStorage.getItem(LocalState.Player) as string;
};
