import { Sprite } from './Sprite';

import spritesheet from '../assets/ships/images/cyborg/spritesheet.png';

export class CyborgSprite extends Sprite {
  constructor() {
    super(spritesheet, 251, 201);
  }
}
