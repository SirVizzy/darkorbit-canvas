import { Sprite } from './Sprite';

import spritesheet from '../assets/ships/sentinel.png';

export class SentinelSprite extends Sprite {
  constructor() {
    super(spritesheet, 6880 / 32, 191);
  }
}
