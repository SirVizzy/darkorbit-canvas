import { canvas } from './canvas';
import { player } from './player';
import { entities } from './state';
import { Vector } from './utils/Vector';

// Mouse.getPositionRelativeToCanvas

const isMouseOnAnyEntity = (mouse: Vector) => {
  return entities.some((entity) => entity.atPositionOf(mouse));
};

export const bindControlListeners = () => {
  // on document click
  document.addEventListener('click', (event) => {
    const x = event.clientX - canvas.width / 2 + player.position.x;
    const y = event.clientY - canvas.height / 2 + player.position.y;

    const mouse = new Vector(x, y);

    // check if clicked on entity.
    entities.forEach((entity) => {
      if (entity.atPositionOf(mouse)) {
        player.mark(entity);
      }
    });
  });

  // mousemove make cursor pointer if over entity
  document.addEventListener('mousemove', (event) => {
    const x = event.clientX - canvas.width / 2 + player.position.x;
    const y = event.clientY - canvas.height / 2 + player.position.y;

    const mouse = new Vector(x, y);

    if (isMouseOnAnyEntity(mouse)) {
      canvas.style.cursor = 'pointer';
    } else {
      canvas.style.cursor = 'default';
    }
  });

  // on click move player to mouse position
  document.addEventListener('click', (event) => {
    const x = event.clientX - canvas.width / 2 + player.position.x;
    const y = event.clientY - canvas.height / 2 + player.position.y;

    const mouse = new Vector(x, y);
    if (isMouseOnAnyEntity(mouse)) {
      return;
    }

    player.move(mouse);
  });

  // check if user clicks on ctrl key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Control') {
      player.attack();
    }
  });
};
