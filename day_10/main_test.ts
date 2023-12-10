import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { partOne, partTwo } from "./main.ts";

const inputOne = `
..F7.
.FJ|.
SJ.L7
|F--J
LJ...
`;

Deno.test("part one", () => {
  const res = partOne(inputOne);

  assertEquals(res, 8);
});

Deno.test("part one cleanup", () => {
  const res = prepareGrid(`
--F7.
.FJ|.
SJ.L7
|F--J
LJ...
`);

  assertEquals(
    res,
    `
--F7.
.FJ|.
SJ.L7
|F--J
LJ...
`,
  );
});

Deno.test("part 2 complex", () => {
  const res = partTwo(`
FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L
`);

  assertEquals(res, 10);
});

Deno.test("part 2 simple", () => {
  const res = partTwo(`
...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........
`);

  assertEquals(res, 4);
});
