export class Sprite {
  private images: HTMLImageElement[] = [];
  private active: HTMLImageElement | null = null;

  constructor(private sources: string[]) {}

  public draw(ctx: CanvasRenderingContext2D) {
    if (this.active) {
      ctx.drawImage(this.active, -this.active.width / 2, -this.active.height / 2);
    }
  }

  public preloadAll() {
    const promises = this.sources.map((src) => this.preload(src));
    return Promise.all(promises).then((images) => {
      this.images = images;
      this.active = images[0];
    });
  }

  private preload(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = src;
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
    });
  }

  public size() {
    return this.sources.length;
  }

  public update(index: number) {
    this.active = new Image();
    this.active.src = this.sources[index];
  }

  public height() {
    if (this.active) {
      return this.active.height;
    }

    return 0;
  }
}
