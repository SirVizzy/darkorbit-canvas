import { Entity } from './entities/Entity';
import { Health } from './entities/Health';
import { player } from './player';
import { BossDevolariumSprite } from './sprites/BossDevolarium.Sprite';
import { SentinelSprite } from './sprites/Sentinel.Sprite';
import { Sprite } from './sprites/Sprite';
import { StreunerSprite } from './sprites/Streuner.Sprite';
import { Vector } from './utils/Vector';

//  new Entity(new GoliathSprite()

export const entities: Entity[] = [];

const streuner = new Entity(new StreunerSprite(), new Vector(200, 200), new Health(10000, 10000, 10000));

streuner.mark(player);
streuner.attack();

entities.push(streuner);
