import { Sprite } from './Sprite';

import spritesheet from '../assets/ships/phoenix.png';

export class PhoenixSprite extends Sprite {
  constructor() {
    super(spritesheet, 5664 / 32, 158);
  }
}
