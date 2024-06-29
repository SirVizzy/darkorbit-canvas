import { canvas, ctx } from './canvas';
import { player } from './player';
import { entities } from './state';

// TODO: Move responsibility to the entities.
const drawCircleAtOpponent = () => {
  const opponent = player.opponent;
  if (opponent) {
    ctx.beginPath();
    ctx.arc(opponent.position.x, opponent.position.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
  }
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate canvas offset to center player
  const offsetX = canvas.width / 2 - player.position.x;
  const offsetY = canvas.height / 2 - player.position.y;

  ctx.save();
  ctx.translate(offsetX, offsetY);

  // Draw entities relative to the camera offset
  entities.forEach((entity) => {
    entity.draw(ctx);
  });

  drawCircleAtOpponent();

  // draw player on top.
  player.draw(ctx);

  ctx.restore();
};

const update = () => {
  player.update();
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
