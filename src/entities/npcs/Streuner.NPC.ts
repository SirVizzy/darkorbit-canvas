import { Damage } from "../../components/Damage";
import { Health } from "../../components/Health";
import { NPC } from "../../components/NPC";
import { NPCBuilder } from "../../components/NPCBuilder";
import { Reward } from "../../components/Reward";
import { BossDevolariumSprite } from "../../sprites/Devolarium.Sprite";
import { StreunerSprite } from "../../sprites/Streuner.Sprite";
import { Vector } from "../../utils/Vector";

// https://board-en.darkorbit.com/threads/npc-charts-for-all-npcs.1004/

// Example of passive NPC.
export class Streuner extends NPC {
  constructor(position: Vector) {
    const entity = new NPCBuilder()
      .position(position)
      .sprite(new StreunerSprite())
      .health(new Health(800, 400, 0))
      .reward(new Reward(1, 400))
      .damage(new Damage(15, 20))
      .speed(280)
      .passive()
      .build();

    super(entity, entity._passive);
  }
}

// Example of agressive NPC.
export class BossDevolarium extends NPC {
  constructor(position: Vector) {
    const entity = new NPCBuilder()
      .position(position)
      .sprite(new BossDevolariumSprite())
      .health(new Health(400_000, 400_000, 0))
      .reward(new Reward(64, 204_800))
      .damage(new Damage(4_100, 4_650))
      .speed(150)
      .aggressive()
      .build();

    super(entity, entity._passive);
  }
}
