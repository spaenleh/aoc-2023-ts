import { getLines, multiply, sum } from "../utils.ts";

const getInput = (): Promise<string> =>
  Deno.readTextFile(new URL(`./input.txt`, import.meta.url));

const validateGame = (game: string): boolean => {
  const colors = game.split(",");
  return colors.every((c) => {
    const [num, color] = c.trim().split(" ");
    return parseInt(num) <= ["red", "green", "blue"].indexOf(color) + 12;
  });
};

const getCubeNumber = (line: string): [number, number, number] => {
  // here we replace the draw separator to be able to compare all the colors in one go
  const games = line.split(":")[1].replaceAll(";", ",");
  // iterate over the each color draw and remember the biggest number of cubes shown at one time
  return games.split(",").reduce<[number, number, number]>(
    (acc, t) => {
      const [num, color] = t.trim().split(" ");
      const idx = ["red", "green", "blue"].indexOf(color);
      acc[idx] = Math.max(parseInt(num), acc[idx]);
      return acc;
    },
    [0, 0, 0],
  );
};

export const partOne = (input: string): number => {
  const lines = getLines(input);
  let sum = 0;
  lines.map((l, idx) => {
    const games = l.split(":")[1].split(";");
    if (games.every(validateGame)) {
      sum += idx + 1;
    }
  });
  return sum;
};

export const partTwo = (input: string) => {
  const lines = getLines(input);
  return sum(lines.map(getCubeNumber).map(multiply));
};

if (import.meta.main) {
  console.log(partOne(await getInput()));
  console.log(partTwo(await getInput()));
}
