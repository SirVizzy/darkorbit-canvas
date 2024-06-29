import { canvas } from './canvas';
import { player } from './player';
import { entities } from './state';
import { Vector } from './utils/Vector';

// Mouse.getPositionRelativeToCanvas

export const bindControlListeners = () => {
  // on document click
  document.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - canvas.width / 2 + player.currentPosition.x;
    const y = event.clientY - canvas.height / 2 + player.currentPosition.y;

    const mouse = new Vector(x, y);

    // check if clicked on entity.
    entities.forEach((entity) => {
      if (entity.isMouseOnEntity(mouse)) {
        console.log('clicked on entity', entity.constructor.name);
        // convert mark to some target where you can set selected target
      }
    });
  });

  document.addEventListener('mousedown', () => {
    const move = (e: MouseEvent) => {
      const x = e.clientX - canvas.width / 2 + player.currentPosition.x;
      const y = e.clientY - canvas.height / 2 + player.currentPosition.y;

      player.move(new Vector(x, y));

      // get angle and map it to a number between 1 and 16 for the sprite index
      const angle = player.currentPosition.subtract(new Vector(x, y)).angle();

      // Normalize the angle to be between 0 and 2*Math.PI (0 to 360 degrees)
      let normalizedAngle = angle >= 0 ? angle : 2 * Math.PI + angle;

      // Convert normalized angle to degrees
      player.setAngle(normalizedAngle);
    };

    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  });
};
