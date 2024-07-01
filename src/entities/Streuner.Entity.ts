import { Damage } from "../components/Damage";
import { Health } from "../components/Health";
import { NPC } from "../components/NPC";
import { NPCBuilder } from "../components/NPCBuilder";
import { Reward } from "../components/Reward";
import { StreunerSprite } from "../sprites/Streuner.Sprite";
import { Vector } from "../utils/Vector";

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
