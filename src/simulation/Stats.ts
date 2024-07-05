export class Stats {
  private fieldGoalAttempts: number;
  private fieldGoalMakes: number;
  private points: number;
  private pointsPerQuarter: number[];
  private threePointAttempts: number;
  private threePointMakes: number;

  constructor() {
    this.fieldGoalAttempts = 0;
    this.fieldGoalMakes = 0;
    this.points = 0;
    this.pointsPerQuarter = [];
    this.threePointAttempts = 0;
    this.threePointMakes = 0;
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

  getThreePointAttempts(): number {
    return this.threePointAttempts;
  }

  getThreePointMakes(): number {
    return this.threePointMakes;
  }

  incrementFieldGoalAttempts(): void {
    this.fieldGoalAttempts++;
  }

  incrementFieldGoalMakes(): void {
    this.fieldGoalMakes++;
  }

  incrementPoints(points: number, quarter: number): void {
    this.points += points;
    this.pointsPerQuarter[quarter - 1] += points;
  }

  incrementThreePointAttempts(): void {
    this.threePointAttempts++;
  }

  incrementThreePointMakes(): void {
    this.threePointMakes++;
  }
}
