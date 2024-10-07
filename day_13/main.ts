import { getBlocks, getLines, sum, transposeArray } from "../utils.ts";

const getInput = (): Promise<string> =>
  Deno.readTextFile(new URL(`./input.txt`, import.meta.url));

/**
 * This function searches the top half of the input for a reflecting patterm
 * If the `searchSmudges` parameter is true, then it will try to find smudges
 * that can be corrected, That is it will find symetries based on planes that
 * elicit only a single difference.
 */
const searchTopHalf = (inputArr: string[][], searchSmudges = false) => {
  // first half
  const size = Math.ceil(inputArr.length / 2);
  const range = Array.from(Array(size)).map((_, idx) => idx);
  for (const i of range) {
    const firstSide = inputArr.slice(0, i + 1).join("\n");
    const secondSide = inputArr.slice(i + 1, 2 * (i + 1)).reverse().join(
      "\n",
    );

    if (searchSmudges) {
      // count the number of differences
      let diffs = 0;
      Array.from(firstSide).forEach((c, idx) => {
        if (c !== secondSide[idx]) {
          diffs += 1;
        }
      });
      // if there is only a single difference, then it is the smudge we are looking for
      if (diffs === 1) {
        return i + 1;
      }
    } else {
      if (firstSide === secondSide) {
        return i + 1;
      }
    }
  }
};

/**
 * This function is responsible for searching on the top and bottom direction of the input
 */
const getMirror = (input: string[][], searchSmudges?: boolean) => {
  const first = searchTopHalf(input, searchSmudges);
  if (first) {
    return first;
  }
  const second = searchTopHalf(input.toReversed(), searchSmudges);
  if (second) {
    return input.length - second;
  }
  return 0;
};

/**
 * This function is responsible for searching on the vertical and horizontal axis,
 * for this it uses a transpositon of the input
 */
export const getAllMirrors = (input: string[][], searchSmudges?: boolean) => {
  const vertical = getMirror(input, searchSmudges);
  if (vertical) {
    return vertical;
  }
  return -1 * getMirror(transposeArray(input), searchSmudges);
};

/**
 * This function is responsible for parsing the input and sendning it to the searching fucnions
 */
export const day_13 = (input: string, searchSmudges: boolean): number => {
  const maps = getBlocks(input);
  const { h: hOffsets, v: vOffsets } = maps.reduce<
    { h: number[]; v: number[] }
  >((acc, m) => {
    const lines = getLines(m).map((l) => l.split(""));
    const res = getAllMirrors(lines, searchSmudges);
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

export const partOne = (input: string): number => {
  return day_13(input, false);
};

export const partTwo = (input: string): number => {
  return day_13(input, true);
};

if (import.meta.main) {
  console.log(partOne(await getInput()));
  console.log(partTwo(await getInput()));
}
