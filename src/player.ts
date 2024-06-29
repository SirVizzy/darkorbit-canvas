import { Bank } from "./components/Bank";
import { Entity } from "./components/Entity";
import { Health } from "./components/Health";
import { Reward } from "./components/Reward";
import { PhoenixSprite } from "./sprites/Phoenix.Sprite";
import { Updateable } from "./types/Updateable";
import { Vector } from "./utils/Vector";

class Player extends Entity implements Updateable {
  public bank: Bank;

  constructor() {
    super(
      new PhoenixSprite(),
      new Vector(0, 0),
      new Health(1_000_000, 1_000_000, 0),
      new Reward(0, 0),
    );

    this.bank = new Bank(0, 0);
  }

  public update() {
    super.update();

    if (this.opponent && this.opponent.health.dead) {
      this.onEnemyKilled(this.opponent);
    }
  }

  private onEnemyKilled(opponent: Entity) {
    this.bank.add(opponent.reward.uridium, opponent.reward.credits);
  }
}

export const player = new Player();
