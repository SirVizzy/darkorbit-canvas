import { Room } from "../components/Room";
import { Streuner } from "../entities/npcs/Streuner.NPC";
import { NPCManager } from "../managers/NPCManager";

export class TestRoom extends Room {
  constructor() {
    const manager = new NPCManager();

    manager.register(Streuner, 10);

    super(2500, 2500, manager);
  }
}
