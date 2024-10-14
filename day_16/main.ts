import { getLines } from "../utils.ts";

const getInput = (): Promise<string> =>
  Deno.readTextFile(new URL(`./input.txt`, import.meta.url));

const Directions = {
  Left: { x: -1, y: 0 },
  Right: { x: 1, y: 0 },
  Up: { x: 0, y: -1 },
  Down: { x: 0, y: 1 },
} as const;
type Direction = typeof Directions[(keyof typeof Directions)];
type Pos = { x: number; y: number };
type Beam = {
  pos: Pos;
  dir: Direction;
};

export const nextPosition = (beam: Beam, fieldDims: Pos) => {
  const newX = beam.pos.x + beam.dir.x;
  const newY = beam.pos.y + beam.dir.y;
  if (newX > fieldDims.x) {
    return null;
  }
  if (newX < 0) {
    return null;
  }
  if (newY > fieldDims.y) {
    return null;
  }
  if (newY < 0) {
    return null;
  }
  return { x: newX, y: newY };
};

export const nextWorldPosition = (beams: Beam[], field: string[][]): Beam[] => {
  const fieldDims = { y: field.length, x: field[0].length };
  for (const beam of beams) {
    const newBeam = nextPosition(beam, fieldDims);
    // compute what is present at the new position to see if we need to split of if the direction chagnes of if we keep the same
  }

  return beams;
};

export const partOne = (input: string): number => {
  const field = getLines(input).map((l) => l.split(""));
  console.log(field);

  const beams: Beam[] = [{ pos: { x: 0, y: 0 }, dir: Directions.Right }];

  return 0;
};

export const partTwo = (input: string): number => {
  const lines = getLines(input);

  return 0;
};

if (import.meta.main) {
  console.log(partOne(await getInput()));
  console.log(partTwo(await getInput()));
}
