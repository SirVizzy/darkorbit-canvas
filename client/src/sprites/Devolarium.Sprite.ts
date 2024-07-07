import { Sprite } from './Sprite';

import spritesheet from '../assets/ships/boss-devolarium.png';

export class BossDevolariumSprite extends Sprite {
  constructor() {
    super(spritesheet, 9824 / 32, 307);
  }
}
