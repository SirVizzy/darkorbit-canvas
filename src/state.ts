import { Streuner } from './entities/Streuner.Entity';
import { EntityManager } from './managers/EntityManager';

export const entityManager = new EntityManager();

entityManager.register(Streuner, 5);
