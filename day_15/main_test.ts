import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { hash, hashString, partOne, partTwo } from "./main.ts";

const inputOne = `
rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7
`;

Deno.test("hash of H", () => {
  assertEquals(hash(0, "H"), 200);
});
Deno.test("hash of strings", () => {
  assertEquals(hashString("HASH"), 52);
  assertEquals(hashString("rn=1"), 30);
});

Deno.test("part one", () => {
  const res = partOne(inputOne);

  assertEquals(res, 1320);
});

Deno.test("part two", () => {
  const res = partTwo(inputOne);

  assertEquals(res, 145);
});
