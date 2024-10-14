import { assertEquals } from "assert";
import { partOne, partTwo } from "./main.ts";

const inputOne = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;

const inputTwo = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`;

Deno.test("part one", () => {
  const res = partOne(inputOne);

  assertEquals(res, 142);
});

Deno.test("part two", async (t) => {
  await t.step("overlaping numbers", () => {
    const test = "eightwojdthree";
    assertEquals(extractNumber(test), 83);
  });

  await t.step("final", () => {
    const res = partTwo(inputTwo);

    assertEquals(res, 281);
  });
});

function extractNumber(test: string): number {
  throw new Error("Function not implemented.");
}
