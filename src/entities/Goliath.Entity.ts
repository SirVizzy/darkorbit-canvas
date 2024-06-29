import { GoliathSprite } from '../sprites/Goliath.Sprite';
import { StreunerSprite } from '../sprites/Streuner.Sprite';
import { Vector } from '../utils/Vector';
import { Entity } from './Entity';

export class Goliath extends Entity {
  constructor(position: Vector) {
    super(new GoliathSprite(), 2, position);
  }
}
