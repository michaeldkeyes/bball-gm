/**
 * Stats class to hold the statistics of a player in a basketball game.
 * It includes methods to get and set various stats like points, field goals made, free throws made, etc.
 * The stats are initialized to zero and can be updated during the game simulation.
 */
export class Stats {
  _defensiveRebounds: number;
  _fieldGoalAttempts: number;
  _fieldGoalsMade: number;
  _freeThrowAttempts: number;
  _freeThrowsMade: number;
  _offensiveRebounds: number;
  _points: number;
  _pointsPerQuarter: number[];
  _threePointAttempts: number;
  _threePointMade: number;

  constructor() {
    this._defensiveRebounds = 0;
    this._fieldGoalAttempts = 0;
    this._fieldGoalsMade = 0;
    this._freeThrowAttempts = 0;
    this._freeThrowsMade = 0;
    this._offensiveRebounds = 0;
    this._points = 0;
    this._pointsPerQuarter = [];
    this._threePointAttempts = 0;
    this._threePointMade = 0;
  }

  get defensiveRebounds(): number {
    return this._defensiveRebounds;
  }

  set defensiveRebounds(value: number) {
    this._defensiveRebounds = value;
  }

  get points(): number {
    return this._points;
  }

  set points(value: number) {
    this._points = value;
  }

  get fieldGoalAttempts(): number {
    return this._fieldGoalAttempts;
  }

  set fieldGoalAttempts(value: number) {
    this._fieldGoalAttempts = value;
  }

  get freeThrowAttempts(): number {
    return this._freeThrowAttempts;
  }

  set freeThrowAttempts(value: number) {
    this._freeThrowAttempts = value;
  }

  get freeThrowsMade(): number {
    return this._freeThrowsMade;
  }

  set freeThrowsMade(value: number) {
    this._freeThrowsMade = value;
  }

  get fieldGoalsMade(): number {
    return this._fieldGoalsMade;
  }

  set fieldGoalsMade(value: number) {
    this._fieldGoalsMade = value;
  }

  get offensiveRebounds(): number {
    return this._offensiveRebounds;
  }

  set offensiveRebounds(value: number) {
    this._offensiveRebounds = value;
  }

  get pointsPerQuarter(): number[] {
    return this._pointsPerQuarter;
  }

  get rebounds(): number {
    return this._offensiveRebounds + this._defensiveRebounds;
  }

  get threePointAttempts(): number {
    return this._threePointAttempts;
  }
  set threePointAttempts(value: number) {
    this._threePointAttempts = value;
  }

  get threePointMade(): number {
    return this._threePointMade;
  }
  set threePointMade(value: number) {
    this._threePointMade = value;
  }
}
