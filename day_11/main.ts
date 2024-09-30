import { getLines, sum, transposeArray } from "../utils.ts";

const getInput = (): Promise<string> =>
  Deno.readTextFile(new URL(`./input.txt`, import.meta.url));

const addLines = (arr: string[][]) =>
  arr.reduce<string[][]>((newLines, l) => {
    if (l.every((c) => c === ".")) {
      newLines.push([...l]);
      newLines.push([...l]);
    } else {
      newLines.push([...l]);
    }
    return newLines;
  }, []);

const getSpaces = (arr: string[][]) =>
  arr.reduce<number[]>((spaceIdx, l, idx) => {
    if (l.every((c) => c === ".")) {
      spaceIdx.push(idx);
    }
    return spaceIdx;
  }, []);

const getGalaxies = (arr: string[][]) =>
  arr.reduce<{ x: number; y: number }[]>(
    (g, l, yIdx) => {
      l.reduce<number[]>((gl, v, xIdx) => {
        if (v === "#") {
          gl.push(xIdx);
        }
        return gl;
      }, []).map((x) => {
        g.push({ x, y: yIdx });
      });
      return g;
    },
    [],
  );

export const partOne = (input: string): number => {
  const lines = getLines(input).map((l) => Array.from(l));
  // expand space
  const expandedLines = transposeArray(
    addLines(transposeArray(addLines(lines))),
  );

  // compute distances
  const galaxies = getGalaxies(
    expandedLines,
  );
  const distances = galaxies.map((g1, idx) =>
    galaxies.slice(idx + 1).map((g2) =>
      Math.abs(g1.x - g2.x) + Math.abs(g1.y - g2.y)
    )
  );
  return sum(distances.flat());
};

export const partTwo = (input: string, spaceConstant: number): number => {
  const lines = getLines(input).map((l) => Array.from(l));
  // expand space
  const ySpaces = getSpaces(lines);
  const xSpaces = getSpaces(transposeArray(lines));

  // compute distances
  const galaxies = getGalaxies(
    lines,
  );
  const distances = galaxies.map((g1, idx) =>
    galaxies.slice(idx + 1).map((g2) =>
      Math.abs(g1.x - g2.x) + (xSpaces.filter((v) =>
        v > Math.min(g1.x, g2.x) && v < Math.max(g1.x, g2.x)
      ).length * (spaceConstant - 1)) + Math.abs(g1.y - g2.y) +
      (ySpaces.filter((v) =>
        v > Math.min(g1.y, g2.y) && v < Math.max(g1.y, g2.y)
      ).length * (spaceConstant - 1))
    )
  );
  return sum(distances.flat());
};

if (import.meta.main) {
  console.log(partOne(await getInput()));
  console.log(partTwo(await getInput(), 1000000));
}
