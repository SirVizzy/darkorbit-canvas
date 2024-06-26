import { canvas } from './canvas';
import { player } from './player';
import { Vector } from './utils/Vector';

// export const bindControlListeners = () => {
//   document.addEventListener('keydown', (e) => {
//     switch (e.key) {
//       case 'w':
//         player.moveTo(player.current.add(new Vector(0, -10)));
//         break;
//       case 'a':
//         player.moveTo(player.current.add(new Vector(-10, 0)));
//         break;
//       case 's':
//         player.moveTo(player.current.add(new Vector(0, 10)));
//         break;
//       case 'd':
//         player.moveTo(player.current.add(new Vector(10, 0)));
//         break;
//     }
//   });
// };

export const bindControlListeners = () => {
  document.addEventListener('mousedown', (e) => {
    const move = (e: MouseEvent) => {
      const x = e.clientX - canvas.width / 2 + player.current.x;
      const y = e.clientY - canvas.height / 2 + player.current.y;

      player.moveTo(new Vector(x, y));

      // get angle and map it to a number between 1 and 16 for the sprite index
      const angle = player.current.subtract(new Vector(x, y)).angle();

      // Normalize the angle to be between 0 and 2*Math.PI (0 to 360 degrees)
      let normalizedAngle = angle >= 0 ? angle : 2 * Math.PI + angle;

      console.log(angle);

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
