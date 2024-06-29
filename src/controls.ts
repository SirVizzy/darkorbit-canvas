import { canvas } from './canvas';
import { player } from './player';
import { entityManager } from './state';
import { Vector } from './utils/Vector';

// Mouse.getPositionRelativeToCanvas

const isMouseOnAnyEntity = (mouse: Vector) => {
  return entityManager.entities.some((entity) => entity.atPositionOf(mouse));
};

export const bindControlListeners = () => {
  let isMouseDown = false;

  // Handle mouse down event
  document.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
      // Left mouse button
      isMouseDown = true;

      // Start continuous movement immediately
      handleMouseMove(event);
    }
  });

  // Handle mouse up event
  document.addEventListener('mouseup', (event) => {
    if (event.button === 0) {
      // Left mouse button
      isMouseDown = false;
    }
  });

  // Handle mouse move event
  const handleMouseMove = (event: MouseEvent) => {
    const x = event.clientX - canvas.width / 2 + player.position.x;
    const y = event.clientY - canvas.height / 2 + player.position.y;
    const mouse = new Vector(x, y);

    // Check if mouse is over any entity
    if (isMouseOnAnyEntity(mouse) && !isMouseDown) {
      canvas.style.cursor = 'pointer';
    } else {
      canvas.style.cursor = 'default';
    }

    // Move player if mouse button is down and not over any entity
    if (isMouseDown && !isMouseOnAnyEntity(mouse)) {
      player.move(mouse);
    }
  };

  document.addEventListener('mousemove', handleMouseMove);

  // Handle click event (for selection)
  document.addEventListener('click', (event) => {
    const x = event.clientX - canvas.width / 2 + player.position.x;
    const y = event.clientY - canvas.height / 2 + player.position.y;
    const mouse = new Vector(x, y);

    let clickedOnEntity = false;
    entityManager.entities.forEach((entity) => {
      if (entity.atPositionOf(mouse)) {
        player.mark(entity);
        clickedOnEntity = true;
      }
    });

    // Optionally handle movement on click if not clicking on entity
    if (!clickedOnEntity && !isMouseDown) {
      player.move(mouse);
    }
  });

  // Check if user clicks on ctrl key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Control') {
      if (player.attacking) {
        player.peace();
      } else {
        player.attack();
      }
    }
  });
};
