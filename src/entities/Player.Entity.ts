import { Bank } from "../components/Bank";
import { Damage } from "../components/Damage";
import { Entity } from "../components/Entity";
import { Health } from "../components/Health";
import { EntityBuilder } from "../components/NPCBuilder";
import { Reward } from "../components/Reward";
import { PhoenixSprite } from "../sprites/Phoenix.Sprite";
import { Updateable } from "../types/Updateable";
import { Vector } from "../utils/Vector";

export class Player extends Entity implements Updateable {
  public bank: Bank;

  constructor() {
    const entity = new EntityBuilder()
      .position(new Vector(5000, 5000))
      .sprite(new PhoenixSprite())
      .health(new Health(1_000_000, 1_000_000, 0))
      .reward(new Reward(0, 0))
      .damage(new Damage(100, 500))
      .speed(1000)
      .build();

    super(
      entity.sprite,
      entity.position,
      entity.health,
      entity.reward,
      entity.speed,
      entity.damage,
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
