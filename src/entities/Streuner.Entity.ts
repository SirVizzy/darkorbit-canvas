import { StreunerSprite } from '../sprites/Streuner.Sprite';
import { Vector } from '../utils/Vector';
import { Entity } from './Entity';

export class Streuner extends Entity {
  constructor() {
    super(new StreunerSprite(), new Vector(300, 300));
  }
}
