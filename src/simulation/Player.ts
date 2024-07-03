import { getRandomNumber } from "./utils/random";

export class Player {
  private firstName: string;
  private lastName: string;
  private position: string;
  private shooting: number;

  constructor(firstName: string, lastName: string, position: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.position = position;
    this.shooting = getRandomNumber(100);
  }

  getShooting(): number {
    return this.shooting;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
