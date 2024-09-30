import { getBlocks, getLines, sum, transposeArray } from "../utils.ts";

const getInput = (): Promise<string> =>
  Deno.readTextFile(new URL(`./input.txt`, import.meta.url));

const searchTopHalf = (inputArr: string[][]) => {
  // first half
  const size = Math.ceil(inputArr.length / 2);
  const range = Array.from(Array(size)).map((_, idx) => idx);
  for (const i of range) {
    const firstSide = inputArr.slice(0, i + 1).join("\n");
    const secondSide = inputArr.slice(i + 1, 2 * (i + 1)).reverse().join(
      "\n",
    );

    if (firstSide === secondSide) {
      return i + 1;
    }
  }
};

const getMirror = (input: string[][]) => {
  const first = searchTopHalf(input);
  if (first) {
    return first;
  }
  const second = searchTopHalf(input.toReversed());
  if (second) {
    return input.length - second;
  }
  return 0;
};

export const getAllMirrors = (input: string[][]) => {
  const vertical = getMirror(input);
  if (vertical) {
    return vertical;
  }
  return -1 * getMirror(transposeArray(input));
};

export const partOne = (input: string): number => {
  const maps = getBlocks(input);
  const { h: hOffsets, v: vOffsets } = maps.reduce<
    { h: number[]; v: number[] }
  >((acc, m) => {
    const lines = getLines(m).map((l) => l.split(""));
    const res = getAllMirrors(lines);
    if (res > 0) {
      acc.v.push(res);
    } else {
      acc.h.push(-1 * res);
    }
    return acc;
  }, { h: [], v: [] });

  const hOffsetSum = sum(hOffsets);
  const vOffsetSum = sum(vOffsets) * 100;
  return hOffsetSum + vOffsetSum;
};

export const partTwo = (input: string): number => {
  const lines = getLines(input);

  return 0;
};

if (import.meta.main) {
  console.log(partOne(await getInput()));
  console.log(partTwo(await getInput()));
}
