import { canvas, ctx } from './canvas';
import { Entity } from './entities/Entity';
import { Streuner } from './entities/Streuner.Entity';
import { player } from './player';
import { GoliathSprite } from './sprites/Goliath.Sprite';

const entity = new Entity(new GoliathSprite());

const streuner = new Streuner();

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate canvas offset to center player
  const offsetX = canvas.width / 2 - player.current.x;
  const offsetY = canvas.height / 2 - player.current.y;

  ctx.save();
  ctx.translate(offsetX, offsetY);

  // Draw entities relative to the camera offset
  entity.draw(ctx);
  streuner.draw(ctx);

  // draw player on top.
  player.draw(ctx);

  ctx.restore();
};

const update = () => {
  player.update();
  entity.update();
};

export const startAnimationLoop = () => {
  const loop = () => {
    draw();
    update();

    requestAnimationFrame(loop);
  };

  loop();
};
