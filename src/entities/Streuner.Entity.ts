import { StreunerSprite } from '../sprites/Streuner.Sprite';
import { Vector } from '../utils/Vector';
import { Entity } from './Entity';
import { Health } from './Health';

export class Streuner extends Entity {
  constructor(position: Vector) {
    super(new StreunerSprite(), position, new Health(800, 400, 0));
  }
}
