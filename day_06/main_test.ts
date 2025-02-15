import { assertEquals } from "assert";
import { partOne, partTwo } from "./main.ts";

const inputOne = `
Time:      7  15   30
Distance:  9  40  200
`;

Deno.test("part one", () => {
  const res = partOne(inputOne);

  assertEquals(res, 288);
});

Deno.test("part two", () => {
  const res = partTwo(inputOne);

  assertEquals(res, 71503);
});
