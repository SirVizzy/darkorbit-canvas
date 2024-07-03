import { player } from "./player";
import { TestRoom } from "./rooms/Test.Room";
import { Vector } from "./utils/Vector";

export const isInPlayerView = (position: Vector) => {
  // check if location is in view of player (window width and height).
  const x = position.x - player.position.x;
  const y = position.y - player.position.y;

  return (
    Math.abs(x) < window.innerWidth / 2 && Math.abs(y) < window.innerHeight / 2
  );
};

export const room = new TestRoom();
