import { Streuner } from "./entities/Streuner.Entity";
import { NPCManager } from "./managers/NPCManager";

export const entityManager = new NPCManager();

entityManager.register(Streuner, 1);
