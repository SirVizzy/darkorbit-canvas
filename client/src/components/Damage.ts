export class Damage {
  private _lower: number;
  private _upper: number;

  constructor(lower: number, upper: number) {
    this._lower = lower;
    this._upper = upper;
  }

  public value() {
    return Math.floor(
      Math.random() * (this._upper - this._lower + 1) + this._lower,
    );
  }
}
