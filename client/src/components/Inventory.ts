import { sum } from "@common/array/sum";
export class Loadout {
  public lasers: Laser[];

  constructor() {
    this.lasers = [
      // add some lf1 lasers to the loadout
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
      new LF4(),
    ];
  }

  public getLaserDamage() {
    return sum(this.lasers, (laser) => laser.damage);
  }
}

class Item {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Laser extends Item {
  public damage: number;

  constructor(name: string, damage: number) {
    super(name);
    this.damage = damage;
  }
}

export class LF1 extends Laser {
  constructor() {
    super("LF-1", 65);
  }
}

export class LF2 extends Laser {
  constructor() {
    super("LF-2", 140);
  }
}

export class LF3 extends Laser {
  constructor() {
    super("LF-3", 175);
  }
}

export class LF4 extends Laser {
  constructor() {
    super("LF-4", 250);
  }
}
