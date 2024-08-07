import { Bank } from "../components/Bank";
import { Damage } from "../components/Damage";
import { Entity } from "../components/Entity";
import { Health } from "../components/Health";
import { Loadout } from "../components/Inventory";
import { EntityBuilder } from "../components/NPCBuilder";
import { Reward } from "../components/Reward";
import { PhoenixSprite } from "../sprites/Phoenix.Sprite";
import { room } from "../state";
import { Serializable } from "../types/Serializable";
import { Updateable } from "../types/Updateable";
import { Vector } from "../utils/Vector";

export class Player extends Entity implements Updateable, Serializable {
  public loadout: Loadout;
  public bank: Bank;

  constructor() {
    const loadout = new Loadout();

    const entity = new EntityBuilder()
      .position(new Vector(room.width / 2, room.height / 2))
      .sprite(new PhoenixSprite())
      .health(new Health(1_000_000, 1_000_000, 0))
      .reward(new Reward(0, 0))
      .damage(new Damage(loadout.getLaserDamage(), loadout.getLaserDamage()))
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
    this.loadout = loadout;
  }

  public update() {
    super.update();

    if (this.opponent && this.opponent.health.dead) {
      this.onEnemyKilled(this.opponent);
    }
  }

  public serialize() {
    return JSON.stringify({
      position: this.position.serialize(),
      bank: this.bank.serialize(),
    });
  }

  public static deserialize(data: string) {
    const state = JSON.parse(data);

    const player = new Player();

    // Load position.
    player.position = Vector.deserialize(state.position);

    // Load bank.
    player.bank = Bank.deserialize(state.bank);

    return player;
  }

  private onEnemyKilled(opponent: Entity) {
    this.bank.add(opponent.reward.uridium, opponent.reward.credits);
  }
}
