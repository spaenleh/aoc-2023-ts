import { getLines, isNumber, sum } from "../utils.ts";

const numbersMap = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
};

const getInput = (): Promise<string> => Deno.readTextFile(`./input.txt`);

const extractCalibration = (l: string) =>
  parseInt(
    `${l.split("").find(isNumber)}${l.split("").reverse().find(isNumber)}`,
  );

export const partOne = (input: string) => {
  const lines = getLines(input);
  return sum(lines.map(extractCalibration));
};

export const partTwo = (input: string) => {
  const lines = getLines(input);
  const calibrations = lines.map((l) => {
    return extractCalibration(
      Object.entries(numbersMap).reduce(
        // using the substitution by surrounding the number with its representation was taken from Morgan, thank you !
        (acc, [key, value]) => acc.replaceAll(key, `${key}${value}${key}`),
        l,
      ),
    );
  });
  return sum(calibrations);
};

if (import.meta.main) {
  console.log(partOne(await getInput()));
  console.log(partTwo(await getInput()));
}
