import { getLines } from "../utils.ts";

const getInput = (): Promise<string> => Deno.readTextFile(`./input.txt`);

const computeSeedsDest = (seeds: number[], steps: string[]) => {
  const res = steps.reduce((intermediary, step) => {
    const [_conversionLine, ...ranges] = step.trim().split("\n").filter(
      Boolean,
    );
    const translations = ranges.map((r) => {
      const [destStart, sourceStart, rangeLength] = r.split(" ").map((e) =>
        parseInt(e)
      );
      return { destStart, sourceStart, rangeLength };
    });
    intermediary = intermediary.map((s) => {
      const rightTrans = translations.find((t) =>
        t.sourceStart <= s && t.sourceStart + t.rangeLength > s
      );
      if (rightTrans) {
        return rightTrans?.destStart - rightTrans?.sourceStart + s;
      }
      return s;
    });
    return intermediary;
  }, seeds);
  return res;
};

export const partOne = (input: string): number => {
  // split the input into the sections
  const [seedInput, ...steps] = input.split("\n\n");
  const seedsList = seedInput.split(":")[1].trim();
  const seeds = seedsList.split(" ").map((e) => parseInt(e));
  // split each section

  return Math.min(...computeSeedsDest(seeds, steps));
};

export const partTwo = (input: string): number => {
  // split the input into the sections
  const [seedInput, ...steps] = input.split("\n\n");
  const seedsList = seedInput.split(":")[1].trim();
  const seeds = seedsList.split(" ").map((e) => parseInt(e)).reduce<
    { start: number; length: number }[]
  >(
    (acc, elem, idx) => {
      // insert a new seed start with length 0
      if (idx % 2 == 0) {
        acc.push({ start: elem, length: 0 });
      } else {
        // update the length of the last array element
        acc[acc.length - 1].length = elem;
      }
      return acc;
    },
    [],
  );

  const findOriginalSeedValue = (final: number) => {
    return steps.reverse().reduce((s, step) => {
      const [_conversionLine, ...ranges] = step.trim().split("\n").filter(
        Boolean,
      );
      // console.log(_conversionLine);
      const translations = ranges.map((r) => {
        const [originalStart, nextStart, length] = r.split(" ").map((e) =>
          parseInt(e)
        );
        return { originalStart, nextStart, length };
      });
      // console.log(s, translations);

      const rightTrans = translations.find((t) =>
        t.originalStart <= s && t.originalStart + t.length > s
      );
      if (rightTrans) {
        s = rightTrans?.originalStart - rightTrans?.nextStart + s;
      }
      return s;
    }, final);
  };
  let res = 0;
  let isAnOriginalSeed = false;
  // find the first
  while (!isAnOriginalSeed) {
    // console.log(res);
    const originalSeedForRes = findOriginalSeedValue(res);
    const shouldBeRes = computeSeedsDest([originalSeedForRes], steps)[0];
    console.log(res, shouldBeRes);
    isAnOriginalSeed = seeds.some(({ start, length }) =>
      start <= originalSeedForRes && (start + length) > originalSeedForRes
    );
    res += 1;
  }

  // console.log(seeds);
  // split each section

  console.log(res);
  return res;
};

if (import.meta.main) {
  console.log(partOne(await getInput()));
  console.log(partTwo(await getInput()));
}
