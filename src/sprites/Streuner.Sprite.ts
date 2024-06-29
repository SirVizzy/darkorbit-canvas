import { Sprite } from './Sprite';

import spritesheet from '../assets/ships/streuner.png';

export class StreunerSprite extends Sprite {
  constructor() {
    super(spritesheet, 110, 97);
  }
}
