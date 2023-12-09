import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { partOne, partTwo } from "./main.ts";

const inputOne = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`;

Deno.test("part one", () => {
  const res = partOne(inputOne);

  assertEquals(res, 114);
});

Deno.test("part two", () => {
  const res = partTwo(inputOne);

  assertEquals(res, 2);
});
