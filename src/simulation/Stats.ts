export class Stats {
  private fieldGoalAttempts: number;
  private fieldGoalMakes: number;
  private points: number;

  constructor() {
    this.fieldGoalAttempts = 0;
    this.fieldGoalMakes = 0;
    this.points = 0;
  }

  incrementPoints(points: number): void {
    this.points += points;
  }

  incrementFieldGoalAttempts(): void {
    this.fieldGoalAttempts++;
  }

  incrementFieldGoalMakes(): void {
    this.fieldGoalMakes++;
  }
}
