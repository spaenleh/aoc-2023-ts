import { partOne, partTwo } from "./main.ts";
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

const inputOne = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`;

Deno.test("part one", () => {
  const res = partOne(inputOne);
  assertEquals(res, 4361);
});

Deno.test("part two", () => {
  const res = partTwo(inputOne);
  assertEquals(res, 467835);
});
