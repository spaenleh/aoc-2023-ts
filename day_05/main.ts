import { getLines } from "../utils.ts";

const getInput = (): Promise<string> => Deno.readTextFile(`./input.txt`);

export const partOne = (input: string): number => {
  // split the input into the sections
  const [seedInput, ...steps] = input.split("\n\n");
  const seedsList = seedInput.split(":")[1].trim();
  const seeds = seedsList.split(" ").map((e) => parseInt(e));
  // split each section
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

  return Math.min(...res);
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
  console.log(seeds);
  // split each section
  const res = steps.reduce((intermediary, step) => {
    const [_conversionLine, ...ranges] = step.trim().split("\n").filter(
      Boolean,
    );
    console.log(_conversionLine);
    const translations = ranges.map((r) => {
      const [destStart, sourceStart, rangeLength] = r.split(" ").map((e) =>
        parseInt(e)
      );
      return { destStart, sourceStart, rangeLength };
    });
    // console.log(translations);
    intermediary = intermediary.reduce<{ start: number; length: number }[]>(
      (acc, s) => {
        translations.forEach((t) => {
          // seed range can be completely translated
          if (
            s.start >= t.sourceStart &&
            t.sourceStart + t.rangeLength >= s.start + s.length
          ) {
            // update seed by only shifting the start by the difference between the translation dest and the source
            acc.push({
              start: t.sourceStart - s.start + t.destStart,
              length: s.length,
            });
          }
          // seeds range starts in the translation
          if (
            s.start >= t.sourceStart && s.start < t.sourceStart + t.rangeLength
          ) {
            // find how much we can translate
            acc.push({
              start: t.destStart,
              length: t.sourceStart + t.rangeLength - s.start,
            });
            // acc
          }
        });
        console.log(acc);

        return acc;
      },
      [],
    );
    return intermediary;
  }, seeds);
  console.log(res);
  return Math.min(...res.map((s) => s.start));
};

if (import.meta.main) {
  console.log(partOne(await getInput()));
  console.log(partTwo(await getInput()));
}
