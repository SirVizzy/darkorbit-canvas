import { Bank } from './Bank';
import { Entity } from './entities/Entity';
import { Health } from './entities/Health';
import { PhoenixSprite } from './sprites/Phoenix.Sprite';
import { Updateable } from './types/Updateable';
import { Vector } from './utils/Vector';

class Player extends Entity implements Updateable {
  public bank: Bank;

  constructor() {
    super(new PhoenixSprite(), new Vector(0, 0), new Health(200000, 100000, 0));

    this.bank = new Bank(0, 0);
  }

  public update() {
    super.update();

    if (this.opponent && this.opponent.health.dead) {
      this.onEnemyKilled();
    }
  }

  private onEnemyKilled() {
    this.bank.add(100, 100);
  }
}

export const player = new Player();
