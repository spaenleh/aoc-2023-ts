import { getLines, multiply } from "../utils.ts";

const getInput = (): Promise<string> =>
  Deno.readTextFile(new URL(`./input.txt`, import.meta.url));

const getValues = (input: string) =>
  input.split(":")[1].trim().split(" ").filter(Boolean).map((e) =>
    parseInt(e.trim())
  );
const getKernedValues = (input: string) =>
  parseInt(input.split(":")[1].trim().replaceAll(" ", "").trim());

export const partOne = (input: string): number => {
  const [timeLine, distanceLine] = getLines(input);
  const times = getValues(timeLine);
  const distances = getValues(distanceLine);

  // find all the ways you can win
  const wins = times.map((t, raceIdx) => {
    const runDistances = Array.from(Array(t)).map((_, idx) => {
      const speed = idx;
      const dist = (t - idx) * speed;
      return dist;
    });
    return runDistances.filter((d) => d > distances[raceIdx]);
  });
  return multiply(wins.map((w) => w.length));
};

export const partTwo = (input: string): number => {
  const [timeLine, distanceLine] = getLines(input);
  const times = getKernedValues(timeLine);
  const distances = getKernedValues(distanceLine);
  // find all the ways you can win
  let winsCounter = 0;
  for (let idx = 0; idx < times; idx++) {
    const speed = idx;
    const dist = (times - idx) * speed;
    if (dist > distances) {
      winsCounter += 1;
    }
  }
  return winsCounter;
};

if (import.meta.main) {
  console.log(partOne(await getInput()));
  console.log(partTwo(await getInput()));
}
