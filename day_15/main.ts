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
  const concatInput = getLines(input).join("");
  const sequence = concatInput.split(",").map((s) => {
    if (s.includes("=")) {
      const label = s.slice(0, s.length - 2);
      return {
        type: "+" as const,
        label,
        lense: `${label} ${s[s.length - 1]}`,
      };
    } else {
      const label = s.slice(0, s.length - 1);
      return { type: "-" as const, label };
    }
  });
  const boxes = sequence.reduce<{ [boxId: string]: string[] }>(
    (boxes, instruction) => {
      const boxId = hashString(instruction.label);
      if (instruction.type === "+") {
        const indexOfLense = boxes[boxId]?.findIndex((lense) =>
          lense.includes(instruction.label)
        );
        if (indexOfLense >= 0) {
          // replace the lense
          boxes[boxId][indexOfLense] = instruction.lense;
        } else {
          // insert the lense into the box
          boxes[boxId] = [...(boxes[boxId] ?? []), instruction.lense];
        }
      } else {
        const lenseIndex = boxes[boxId]?.findIndex((lense) =>
          lense.includes(instruction.label)
        );
        if (lenseIndex >= 0) {
          boxes[boxId].splice(lenseIndex, 1);
        }
      }
      return boxes;
    },
    {},
  );
  return Object.entries(boxes).reduce<number>((acc, [boxId, lenses]) => {
    const boxV = Number.parseInt(boxId) + 1;
    return acc + sum(
      lenses.map((l, idx) => {
        const value = (Number.parseInt(l[l.length - 1])) * (idx + 1) * boxV;
        return value;
      }),
    );
  }, 0);
};

if (import.meta.main) {
  console.log(partOne(await getInput()));
  console.log(partTwo(await getInput()));
}
