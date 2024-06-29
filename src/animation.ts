import { canvas, ctx } from './canvas';
import { player } from './player';
import { entities } from './state';

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate canvas offset to center player
  const offsetX = canvas.width / 2 - player.currentPosition.x;
  const offsetY = canvas.height / 2 - player.currentPosition.y;

  ctx.save();
  ctx.translate(offsetX, offsetY);

  // Draw entities relative to the camera offset
  entities.forEach((entity) => entity.draw(ctx));

  // draw player on top.
  player.draw(ctx);

  ctx.restore();
};

const update = () => {
  player.update();

  // update entities
  entities.forEach((entity) => entity.update());
};

export const startAnimationLoop = () => {
  const loop = () => {
    draw();
    update();

    requestAnimationFrame(loop);
  };

  loop();
};
