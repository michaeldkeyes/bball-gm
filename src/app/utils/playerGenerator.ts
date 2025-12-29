import { Player } from "../model/player.interface";
import { Position } from "../model/positions.enum";
import positionAttributes from "../data/positionAttributes";
import { getRandomNumberBetween } from "../simulation/utils/random";

/**
 * Generates an array of random first names for players
 */
const firstNames = [
  "Michael",
  "LeBron",
  "Kobe",
  "Stephen",
  "Kevin",
  "James",
  "Chris",
  "Anthony",
  "Dwyane",
  "Russell",
  "Kawhi",
  "Giannis",
  "Luka",
  "Damian",
  "Joel",
  "Nikola",
  "Jimmy",
  "Paul",
  "Kyrie",
  "Jayson",
  "Devin",
  "Donovan",
  "Trae",
  "Zion",
  "Ja",
  "Bradley",
  "Khris",
  "Pascal",
  "Ben",
  "Brandon",
];

/**
 * Generates an array of random last names for players
 */
const lastNames = [
  "Jordan",
  "James",
  "Bryant",
  "Curry",
  "Durant",
  "Harden",
  "Paul",
  "Davis",
  "Wade",
  "Westbrook",
  "Leonard",
  "Antetokounmpo",
  "Doncic",
  "Lillard",
  "Embiid",
  "Jokic",
  "Butler",
  "George",
  "Irving",
  "Tatum",
  "Booker",
  "Mitchell",
  "Young",
  "Williamson",
  "Morant",
  "Beal",
  "Middleton",
  "Siakam",
  "Simmons",
  "Ingram",
];

/**
 * Generates random attributes for a player based on their position
 * @param position - The position of the player
 * @returns An object containing randomized attributes within the position's min/max ranges
 */
function generateRandomAttributes(position: Position) {
  const positionData = positionAttributes.find((attr) => attr.position === position);

  if (!positionData) {
    throw new Error(`Position attributes not found for position: ${position}`);
  }

  // Generate passing and usageRate as they are not in positionAttributes
  // Using reasonable defaults based on typical basketball attributes
  const passingMin = position === Position.PG ? 150 : position === Position.SG ? 100 : 50;
  const passingMax = position === Position.PG ? 300 : position === Position.SG ? 200 : 150;
  const usageRateMin = 50;
  const usageRateMax = 200;

  return {
    ballHandling: getRandomNumberBetween(
      positionData.ballHandlingMin,
      positionData.ballHandlingMax
    ),
    blocking: getRandomNumberBetween(positionData.blockingMin, positionData.blockingMax),
    defensiveRebounding: getRandomNumberBetween(
      positionData.defensiveReboundingMin,
      positionData.defensiveReboundingMax
    ),
    freeThrowShooting: getRandomNumberBetween(
      positionData.freeThrowShootingMin,
      positionData.freeThrowShootingMax
    ),
    offensiveRebounding: getRandomNumberBetween(
      positionData.offensiveReboundingMin,
      positionData.offensiveReboundingMax
    ),
    passing: getRandomNumberBetween(passingMin, passingMax),
    stealing: getRandomNumberBetween(positionData.stealMin, positionData.stealMax),
    twoPointShooting: getRandomNumberBetween(
      positionData.twoPointShootingMin,
      positionData.twoPointShootingMax
    ),
    threePointShooting: getRandomNumberBetween(
      positionData.threePointShootingMin,
      positionData.threePointShootingMax
    ),
    threeTendency: getRandomNumberBetween(
      positionData.threePointTendencyMin,
      positionData.threePointTendencyMax
    ),
    usageRate: getRandomNumberBetween(usageRateMin, usageRateMax),
  };
}

/**
 * Generates a random player name
 * @param usedNames - Set of already used names to avoid duplicates
 * @returns An object with firstName and lastName
 */
function generateRandomName(usedNames: Set<string>): { firstName: string; lastName: string } {
  let firstName: string;
  let lastName: string;
  let fullName: string;

  // Keep generating until we get a unique name
  do {
    firstName = firstNames[getRandomNumberBetween(0, firstNames.length - 1)];
    lastName = lastNames[getRandomNumberBetween(0, lastNames.length - 1)];
    fullName = `${firstName} ${lastName}`;
  } while (usedNames.has(fullName));

  usedNames.add(fullName);
  return { firstName, lastName };
}

/**
 * Generates a random player for a specific position and team
 * @param position - The position of the player
 * @param teamId - The team ID (1 or 2)
 * @param usedNames - Set of already used names to avoid duplicates
 * @returns A Player object with randomized attributes
 */
function generatePlayer(position: Position, teamId: number, usedNames: Set<string>): Player {
  const { firstName, lastName } = generateRandomName(usedNames);
  const attributes = generateRandomAttributes(position);

  return {
    firstName,
    lastName,
    position,
    attributes,
    teamId,
  };
}

/**
 * Generates random players for two teams
 * Each team will have 2 players of each position (PG, SG, SF, PF, C) plus 2 additional players
 * with random positions for a total of 12 players per team
 * @returns An object containing an array of players
 */
export function generateRandomPlayers(): Player[] {
  const usedNames = new Set<string>();
  const positions = [Position.PG, Position.SG, Position.SF, Position.PF, Position.C];

  const team: Player[] = [];

  // Generate 2 players for each position for team 1
  positions.forEach((position) => {
    for (let i = 0; i < 2; i++) {
      team.push(generatePlayer(position, 1, usedNames));
    }
  });

  // Generate 2 additional players with random positions
  for (let i = 0; i < 2; i++) {
    const randomPosition = positions[getRandomNumberBetween(0, positions.length - 1)];
    team.push(generatePlayer(randomPosition, 1, usedNames));
  }

  return team;
}
