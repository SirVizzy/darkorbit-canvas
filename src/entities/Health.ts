export class Health {
  public health: number;
  public shield: number;
  public hull: number;

  constructor(health: number, shield: number, hull: number) {
    this.health = health;
    this.shield = shield;
    this.hull = hull;
  }

  public remove(amount: number) {
    if (this.hull > 0) {
      this.hull -= amount;
    } else if (this.shield > 0) {
      this.shield -= amount;
    } else {
      this.health -= amount;
    }
  }
}
