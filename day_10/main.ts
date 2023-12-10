import { getLines } from "../utils.ts";

const D = {
  N: "N",
  S: "S",
  E: "E",
  W: "W",
} as const;

type Tile = { x: number; y: number; sym: keyof typeof NEXT_DIR };
type Grid = string[][];
const getInput = (): Promise<string> => Deno.readTextFile(`./input.txt`);

const DIR = [{
  dir: D.N,
  pipes: ["7", "|", "F"],
  dirOffset: { x: 0, y: -1 },
  coord: { x: 1, y: 0 },
}, {
  dir: D.S,
  pipes: ["J", "|", "L"],
  dirOffset: { x: 0, y: +1 },
  coord: { x: 1, y: 2 },
}, {
  dir: D.E,
  pipes: ["J", "-", "7"],
  dirOffset: { x: +1, y: 0 },
  coord: { x: 2, y: 1 },
}, {
  dir: D.W,
  pipes: ["L", "-", "F"],
  dirOffset: { x: -1, y: 0 },
  coord: { x: 0, y: 1 },
}];

const NEXT_DIR = {
  "7": [D.W, D.S],
  "|": [D.N, D.S],
  "F": [D.E, D.S],
  "J": [D.N, D.W],
  "-": [D.E, D.W],
  "L": [D.N, D.E],
  "S": [D.N, D.S, D.E, D.W],
};

const printGrid = (g: Grid) => console.log(g.map((l) => l.join("")).join("\n"));

const getSurroundings = (c: Tile, grid: Grid) =>
  grid.slice(c.y - 1, c.y + 2).map((l) => l.slice(c.x - 1, c.x + 2));

const hasConnectingPipe = (c: Tile, grid: Grid) => {
  const connections: Tile[] = [];
  const surroundings = getSurroundings(c, grid);
  // printGrid(surroundings);
  DIR.filter((d) => (NEXT_DIR[c.sym] as string[]).includes(d.dir)).map(
    ({ pipes, coord, dirOffset }) => {
      const investigatedTile = surroundings[coord.y][coord.x];
      if (pipes.includes(investigatedTile)) {
        connections.push({
          x: c.x + dirOffset.x,
          y: c.y + dirOffset.y,
          sym: investigatedTile as keyof typeof NEXT_DIR,
        });
      }
    },
  );
  return connections;
};

const prepareGrid = (input: string) => {
  const rawGrid = getLines(input).map((l) => [".", ...Array.from(l), "."]);
  const paddingLine = Array.from(Array(rawGrid[0].length)).fill(".");
  return [paddingLine, ...rawGrid, paddingLine];
};

export const partOne = (input: string): number => {
  const grid = prepareGrid(input);
  const startingPosition = grid.reduce<{ x: number; y: number } | undefined>(
    (pos, line, yIdx) => {
      const xIdx = line.indexOf("S");
      if (xIdx !== -1) {
        return { x: xIdx, y: yIdx };
      } else {
        return pos;
      }
    },
    undefined,
  );
  if (!startingPosition) {
    throw new Error("Coundn't find the starting position");
  }
  const loop: Tile[] = [{ ...startingPosition, sym: "S" }];
  // const startingConnections = hasConnectingPipe(loop[0], grid);
  let currentTile = loop[0];
  let step = 0;
  do {
    const possibleOnes = hasConnectingPipe(currentTile, grid);

    const chosenOne = possibleOnes.find((p) =>
      !loop.some((l) => l.x === p.x && l.y === p.y)
    );
    if (!chosenOne) {
      console.log("found the start");
      currentTile = loop[0];
    } else {
      currentTile = chosenOne;
    }
    loop.push(currentTile);
    step += 1;
  } while (currentTile.sym !== "S");

  return step / 2;
};

export const partTwo = (input: string): number => {
  const lines = getLines(input);

  return 0;
};

if (import.meta.main) {
  console.log(partOne(await getInput()));
  console.log(partTwo(await getInput()));
}
