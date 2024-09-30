import { getLines, isNumber, multiply, sum } from "../utils.ts";

const getInput = (): Promise<string> =>
  Deno.readTextFile(new URL(`./input.txt`, import.meta.url));

// utility function to get all symbols used
const _getSymbols = (lines: string[]) =>
  lines.reduce(
    (acc, l) => {
      Array.from(l).filter((e) => !isNumber(e)).forEach((s) => acc.add(s));
      return acc;
    },
    new Set<string>(),
  );

// list of characters considered symbols
const symbols = ["%", "#", "*", "$", "/", "-", "&", "+", "@", "="];

// function that scans the grid and returns parts numbers with their associated symbol and symbol position
// in case no part was found
const extractedParts = (
  lines: string[],
): { value: number; symbol: string; pos: { x: number; y: number } }[] => {
  const gridWidth = lines[0].length;
  // iterate over each line and detect numbers
  return lines.map((l, idx) => {
    return [...l.matchAll(/[0-9]+/g)].map(
      ({ 0: value, index = 0 }) => {
        const startXIndex = Math.max(index - 1, 0);
        const endXIndex = Math.min(index + value.length, gridWidth);

        // create a padding line for the top and bottom rows
        const paddingLine = ".".repeat(l.length);
        const searchGrid = [
          lines[idx - 1] ?? paddingLine,
          l,
          lines[idx + 1] ?? paddingLine,
        ].map((a) => a?.slice(startXIndex, endXIndex + 1));

        // find if there is a symbol nearby by iterating over all symbols
        const [match] = symbols.map((s) =>
          // iterate over the grid
          searchGrid.map((t, offsetY) => {
            const offsetX = t.indexOf(s);
            if (offsetX !== -1) {
              return {
                symbol: s,
                pos: { x: startXIndex + offsetX, y: idx + offsetY - 1 },
              };
            }
            return undefined;
          })
        ).flat().filter(Boolean);
        return match ? { value: parseInt(value), ...match } : undefined;
      },
    ).filter(Boolean) as {
      value: number;
      symbol: string;
      pos: { x: number; y: number };
    }[];
  }).flat();
};

export const partOne = (input: string): number => {
  const lines = getLines(input);
  // extract all parts (numbers touching a symbol)
  const parts = extractedParts(lines);
  // sum all part numbers
  return sum(parts.map(({ value }) => value));
};

export const partTwo = (input: string) => {
  const lines = getLines(input);
  const parts = [
    ...extractedParts(lines)
      // remove parts that do not touch a "*" symbol
      .filter((v) => v.symbol === "*")
      // compute the number of parts touching the same gear
      .reduce(
        (acc, { pos, value }) => {
          // create a key coposed of the x and y coordiantes
          // i.e: 34-3 for x = 34 and y = 3
          const key = `${pos.x}-${pos.y}`;
          // get the value at the key if it exists
          const currentCount = acc.get(key);
          // append the value of create a new entry if there was no value previously
          acc.set(key, currentCount ? [...currentCount, value] : [value]);
          return acc;
        },
        new Map<string, number[]>(),
      ).values(),
    // only keep the gears that have _exactly_ 2 parts touching and mutliply the part number together
  ].map((values) => values.length == 2 ? multiply(values) : 0);
  // sum the products
  return sum(parts);
};

if (import.meta.main) {
  console.log(partOne(await getInput()));
  console.log(partTwo(await getInput()));
}
