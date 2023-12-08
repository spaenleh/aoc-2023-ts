import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { partOne, partTwo } from "./main.ts";

const inputOne = `
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`;

const inputTwo = `
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`;

const inputThree = `
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`;

Deno.test("part one", () => {
  const res = partOne(inputOne);

  assertEquals(res, 2);
});
Deno.test("part one 2", () => {
  const res = partOne(inputTwo);

  assertEquals(res, 6);
});

Deno.test("part two", () => {
  const res = partTwo(inputThree);

  assertEquals(res, 6);
});
