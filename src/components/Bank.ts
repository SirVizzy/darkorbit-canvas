import { Serializable } from "../types/Serializable";

export class Bank implements Serializable {
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

  public serialize() {
    return JSON.stringify({
      uridium: this.uridium,
      credits: this.credits,
    });
  }

  public static deserialize(data: string) {
    const state = JSON.parse(data);
    return new Bank(state.uridium, state.credits);
  }
}
