export class Vector {
  constructor(public x: number, public y: number) {}

  add(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  subtract(v: Vector): Vector {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  multiply(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  divide(scalar: number): Vector {
    return new Vector(this.x / scalar, this.y / scalar);
  }

  dot(v: Vector): number {
    return this.x * v.x + this.y * v.y;
  }

  cross(v: Vector): number {
    return this.x * v.y - this.y * v.x;
  }

  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Vector {
    return this.divide(this.magnitude());
  }

  angle(): number {
    return Math.atan2(this.y, this.x);
  }

  rotate(angle: number): Vector {
    const x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    const y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    return new Vector(x, y);
  }

  project(v: Vector): Vector {
    return v.multiply(this.dot(v) / v.dot(v));
  }

  reflect(v: Vector): Vector {
    return v.multiply(2 * this.dot(v)).subtract(this);
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}
