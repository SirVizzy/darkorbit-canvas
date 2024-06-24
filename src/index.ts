import { Entity } from './Entity';
import { Player } from './Player.Entity';
import { Vector } from './Vector';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player(new Vector(canvas.width / 2, canvas.height / 2));

const someStaticEntity = new Entity(new Vector(100, 100));

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate canvas offset to center player
  const offsetX = canvas.width / 2 - player.current.x;
  const offsetY = canvas.height / 2 - player.current.y;

  ctx.save();
  ctx.translate(offsetX, offsetY);

  // Draw entities relative to the camera offset
  player.draw(ctx);
  someStaticEntity.draw(ctx);

  ctx.restore();

  // draw coordinates of the player on top left
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`(${player.current.x}, ${player.current.y})`, 10, 30);
};

const update = () => {
  player.update();
  someStaticEntity.update();
};

const loop = () => {
  draw();
  update();

  requestAnimationFrame(loop);
};

// Handle click event to move player to the clicked position
document.addEventListener('click', (e) => {
  // translate the click position to the world position
  const x = e.clientX - canvas.width / 2 + player.current.x;
  const y = e.clientY - canvas.height / 2 + player.current.y;

  player.moveTo(new Vector(x, y));
});

loop();
