import { Serializable } from "../types/Serializable";

export class Vector implements Serializable {
  constructor(
    public x: number,
    public y: number,
  ) {}

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

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  equals(v: Vector, tolerance: number = 1e-5): boolean {
    return (
      Math.abs(this.x - v.x) < tolerance && Math.abs(this.y - v.y) < tolerance
    );
  }

  distance(v: Vector): number {
    return this.subtract(v).length();
  }

  serialize(): string {
    return JSON.stringify(this);
  }

  static deserialize(data: string): Vector {
    const { x, y } = JSON.parse(data);
    return new Vector(x, y);
  }

  toString(): string {
    return `(${this.x}, ${this.y})`;
  }
}
