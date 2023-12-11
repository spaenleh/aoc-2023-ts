import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { partOne, partTwo } from "./main.ts";

const inputOne = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`;

Deno.test("part one", () => {
  const res = partOne(inputOne);

  assertEquals(res, 374);
});

Deno.test("part two", () => {
  const res = partTwo(inputOne, 10);

  assertEquals(res, 1030);
});
Deno.test("part two", () => {
  const res = partTwo(inputOne, 100);

  assertEquals(res, 8410);
});
