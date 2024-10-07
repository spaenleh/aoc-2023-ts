import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { getAllMirrors, partOne, partTwo } from "./main.ts";

const inputOne = `
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`;

[
  { input: [["1"], ["2"], ["3"], ["3"]], result: 3 },
  {
    input: [["1", "2", "3"], ["1", "2", "3"]],
    result: 1,
  },
  {
    input: [["0", "0", "0"], ["1", "2", "3"], ["1", "2", "3"]],
    result: 2,
  },
  { input: [["1", "1", "3"], ["1", "1", "2"]], result: -1 },
  { input: [["2", "3", "3"], ["1", "2", "2"]], result: -2 },
].forEach(
  ({ input, result }) => {
    Deno.test("getMirror", () => {
      assertEquals(getAllMirrors(input), result);
    });
  },
);

Deno.test("part one", () => {
  const res = partOne(inputOne);

  assertEquals(res, 405);
});

Deno.test("part two", () => {
  const res = partTwo(inputOne);

  assertEquals(res, 400);
});
