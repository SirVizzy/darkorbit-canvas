import { StreunerSprite } from '../sprites/Streuner.Sprite';
import { Vector } from '../utils/Vector';
import { Entity } from './Entity';

export class Streuner extends Entity {
  constructor(position: Vector) {
    super(new StreunerSprite(), position);
  }
}
