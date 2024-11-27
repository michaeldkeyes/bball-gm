export class Stats {
  private fieldGoalAttempts: number;
  private fieldGoalMakes: number;
  private freeThrowAttempts: number;
  private freeThrowMakes: number;
  private points: number;
  private pointsPerQuarter: number[];
  private threePointAttempts: number;
  private threePointMakes: number;

  constructor() {
    this.fieldGoalAttempts = 0;
    this.fieldGoalMakes = 0;
    this.freeThrowAttempts = 0;
    this.freeThrowMakes = 0;
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

  getFreeThrowAttempts(): number {
    return this.freeThrowAttempts;
  }

  getFreeThrowMakes(): number {
    return this.freeThrowMakes;
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

  decrementFieldGoalAttempts(): void {
    this.fieldGoalAttempts--;
  }

  decrementThreePointAttempts(): void {
    this.threePointAttempts--;
  }

  incrementFieldGoalAttempts(): void {
    this.fieldGoalAttempts++;
  }

  incrementFieldGoalMakes(): void {
    this.fieldGoalMakes++;
  }

  incrementFreeThrowAttempts(): void {
    this.freeThrowAttempts++;
  }

  incrementFreeThrowMakes(): void {
    this.freeThrowMakes++;
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
