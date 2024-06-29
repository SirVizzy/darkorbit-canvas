export class Bank {
  // user can have uridium and credits

  public uridium: number;
  public credits: number;

  constructor(uridium: number, credits: number) {
    this.uridium = uridium;
    this.credits = credits;
  }

  public add(uridium: number, credits: number) {
    this.uridium += uridium;
    this.credits += credits;
  }
}
