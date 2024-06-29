import { Sprite } from './Sprite';

import spritesheet from '../assets/ships/images/goliath/spritesheet.png';

export class GoliathSprite extends Sprite {
  constructor() {
    super(spritesheet, 170, 151);
  }
}
