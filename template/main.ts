import { getLines } from "../utils.ts";

const getInput = (): Promise<string> =>
  Deno.readTextFile(new URL(`./input.txt`, import.meta.url));

export const partOne = (input: string): number => {
  const lines = getLines(input);

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
