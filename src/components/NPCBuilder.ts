import { Sprite } from "../sprites/Sprite";
import { Vector } from "../utils/Vector";
import { Damage } from "./Damage";
import { Entity } from "./Entity";
import { Health } from "./Health";
import { NPC } from "./NPC";
import { Reward } from "./Reward";

export class EntityBuilder {
  private _position: Vector | null;
  private _sprite: Sprite | null;
  private _health: Health | null;
  private _reward: Reward | null;
  private _speed: number | null;
  private _damage: Damage | null;

  constructor() {
    this._position = null;
    this._sprite = null;
    this._health = null;
    this._reward = null;
    this._speed = null;
    this._damage = null;
  }

  public position(position: Vector) {
    this._position = position;
    return this;
  }

  public sprite(sprite: Sprite) {
    this._sprite = sprite;
    return this;
  }

  public health(health: Health) {
    this._health = health;
    return this;
  }

  public reward(reward: Reward) {
    this._reward = reward;
    return this;
  }

  public speed(speed: number) {
    this._speed = speed;
    return this;
  }

  public damage(damage: Damage) {
    this._damage = damage;
    return this;
  }

  public build() {
    if (!this._position) {
      throw new Error("Position is required.");
    }

    if (!this._sprite) {
      throw new Error("Sprite is required.");
    }

    if (!this._health) {
      throw new Error("Health is required.");
    }

    if (!this._reward) {
      throw new Error("Reward is required.");
    }

    if (!this._speed) {
      throw new Error("Speed is required.");
    }

    if (!this._damage) {
      throw new Error("Damage is required.");
    }

    const entity = new Entity(
      this._sprite,
      this._position,
      this._health,
      this._reward,
      this._speed,
      this._damage,
    );

    return entity;
  }
}

export class NPCBuilder extends EntityBuilder {
  private _passive: boolean | null;

  constructor() {
    super();
    this._passive = null;
  }

  public passive() {
    this._passive = true;
    return this;
  }

  public override build() {
    if (!this._passive) {
      throw new Error("Passive is required.");
    }

    const entity = super.build();
    const npc = new NPC(entity);

    if (this._passive) {
      npc.passive();
    }

    return npc;
  }
}
