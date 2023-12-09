import { getLines, sum } from "../utils.ts";

const getInput = (): Promise<string> => Deno.readTextFile(`./input.txt`);

const getSequences = (input: string) =>
  getLines(input).map((l) => l.split(" ").map((e) => parseInt(e)));
const getReversedSequences = (input: string) =>
  getLines(input).map((l) => l.split(" ").map((e) => parseInt(e)).reverse());

const getNextValueInSequenc = (seq: number[]): number => {
  if (seq.every((e) => e === 0)) {
    // trivial next number is 0
    return 0;
  }
  // recursively compute the next sequence
  const nextOne = getNextValueInSequenc(
    seq.slice(0, seq.length - 1).reduce<number[]>(
      (acc, e, idx) => {
        acc.push(seq[idx + 1] - e);
        return acc;
      },
      [],
    ),
  );
  // next number in the curren sequence has to be the sum
  // of the last digit of the sequence below and the last
  // digit of the current seq
  return nextOne + seq[seq.length - 1];
};

export const partOne = (input: string): number => {
  return sum(getSequences(input).map(getNextValueInSequenc));
};

export const partTwo = (input: string): number => {
  return sum(getReversedSequences(input).map(getNextValueInSequenc));
};

if (import.meta.main) {
  console.log(partOne(await getInput()));
  console.log(partTwo(await getInput()));
}
