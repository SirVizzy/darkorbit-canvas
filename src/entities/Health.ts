export class Health {
  public health: number;
  public shield: number;
  public hull: number;

  get dead() {
    return this.health <= 0;
  }

  private handleHealthEmpty: () => void;

  constructor(health: number, shield: number, hull: number) {
    this.health = health;
    this.shield = shield;
    this.hull = hull;

    this.handleHealthEmpty = () => {};
  }

  public remove(amount: number) {
    let remainingAmount = amount;

    // Remove from hull first
    if (this.hull > 0 && remainingAmount > 0) {
      this.hull -= Math.min(this.hull, remainingAmount);
      remainingAmount -= Math.min(this.hull, remainingAmount);
    }

    // Remove from shield second
    if (this.shield > 0 && remainingAmount > 0) {
      this.shield -= Math.min(this.shield, remainingAmount);
      remainingAmount -= Math.min(this.shield, remainingAmount);
    }

    // Remove from health last
    if (this.health > 0 && remainingAmount > 0) {
      this.health -= Math.min(this.health, remainingAmount);
      remainingAmount -= Math.min(this.health, remainingAmount);
    }

    if (this.health <= 0) {
      this.handleHealthEmpty();
    }
  }

  public onHealthEmpty(handleHealthEmpty: () => void) {
    this.handleHealthEmpty = handleHealthEmpty;
  }
}
