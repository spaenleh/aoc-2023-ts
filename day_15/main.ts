import { getLines, sum } from "../utils.ts";

const getInput = (): Promise<string> =>
  Deno.readTextFile(new URL(`./input.txt`, import.meta.url));

export const hash = (currentValue: number, char: string): number => {
  const asciiValue = currentValue + (char.codePointAt(0) ?? 0);
  const multipliedValue = asciiValue * 17;
  return multipliedValue % 256;
};

export const hashString = (input: string): number =>
  Array.from(input).reduce(hash, 0);

export const partOne = (input: string): number => {
  const concatInput = getLines(input).join("");
  return sum(concatInput.split(",").map(hashString));
};

export const partTwo = (input: string): number => {
  const lines = getLines(input);

  return 0;
};

if (import.meta.main) {
  console.log(partOne(await getInput()));
  console.log(partTwo(await getInput()));
}
