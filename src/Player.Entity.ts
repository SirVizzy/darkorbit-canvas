import { Entity } from './Entity';
import { Vector } from './Vector';

export class Player extends Entity {
  constructor(public position: Vector) {
    super(position);
  }
}
