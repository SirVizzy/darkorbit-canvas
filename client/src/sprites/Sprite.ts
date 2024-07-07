import { Drawable } from '../types/Drawable';

export class Sprite implements Drawable {
  public width: number;
  public height: number;

  private element: HTMLImageElement;

  private index: number = 0;
  private frames: number = 0;

  constructor(src: string, width: number, height: number) {
    this.width = width;
    this.height = height;

    this.element = new Image();
    this.element.src = src;

    this.element.onload = () => {
      this.frames = this.element.width / this.width;
    };
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (this.element) {
      ctx.drawImage(
        this.element,
        this.index * this.width,
        0,
        this.width,
        this.height,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
    }
  }

  public size() {
    return this.frames;
  }

  public update(index: number) {
    this.index = index;
  }
}
