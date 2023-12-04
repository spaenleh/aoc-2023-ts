import { getLines, sum } from "../utils.ts";

const getInput = (): Promise<string> => Deno.readTextFile(`./input.txt`);

const getCountWinningNumbers = (lines: string[]) => {
  return lines.map((l) => {
    const [winning, candidate] = l.split(":")[1].split("|");
    const winningSet = new Set(
      winning.split(" ").filter(Boolean).map((e) => parseInt(e)),
    );
    const candidateSet = new Set(
      candidate.split(" ").filter(Boolean).map((e) => parseInt(e)),
    );
    return new Set([...candidateSet].filter((i) => winningSet.has(i))).size;
  });
};

export const partOne = (input: string): number => {
  const lines = getLines(input);
  const res = sum(
    getCountWinningNumbers(lines).map(
      (c) => c > 0 ? 2 ** (c - 1) : 0,
    ),
  );

  return res;
};

export const partTwo = (input: string): number => {
  const lines = getLines(input);
  const cardStack = Array.from(Array(lines.length)).fill(1);
  getCountWinningNumbers(lines).forEach(
    (c, idx) => {
      Array.from(Array(c)).fill(1).map((_, i) =>
        cardStack[idx + i + 1] += cardStack[idx]
      );
    },
  );
  return sum(cardStack);
};

if (import.meta.main) {
  console.log(partOne(await getInput()));
  console.log(partTwo(await getInput()));
}
