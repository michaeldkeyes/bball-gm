export class Stats {
  private fieldGoalAttempts: number;
  private fieldGoalMakes: number;
  private points: number;
  private pointsPerQuarter: number[];

  constructor() {
    this.fieldGoalAttempts = 0;
    this.fieldGoalMakes = 0;
    this.points = 0;
    this.pointsPerQuarter = [0, 0, 0, 0];
  }

  getFieldGoalAttempts(): number {
    return this.fieldGoalAttempts;
  }

  getFieldGoalMakes(): number {
    return this.fieldGoalMakes;
  }

  getPoints(): number {
    return this.points;
  }

  getPointsPerQuarter(): number[] {
    return this.pointsPerQuarter;
  }

  incrementPoints(points: number, quarter: number): void {
    this.points += points;
    this.pointsPerQuarter[quarter - 1] += points;
  }

  incrementFieldGoalAttempts(): void {
    this.fieldGoalAttempts++;
  }

  incrementFieldGoalMakes(): void {
    this.fieldGoalMakes++;
  }
}
