export const canvas = document.getElementById("canvas") as HTMLCanvasElement;
export const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

export const setupCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
