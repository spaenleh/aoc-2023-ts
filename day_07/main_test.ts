import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { getHandType, HANDS, improveHand, partOne, partTwo } from "./main.ts";

const inputOne = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

Deno.test("part one", () => {
  const res = partOne(inputOne);

  assertEquals(res, 6440);
});

Deno.test("part two", () => {
  const res = partTwo(inputOne);

  assertEquals(res, 5905);
});

const computeJokerHand = (hand: string) => improveHand(getHandType(hand), hand);
Deno.test("Joker rule", () => {
  // no joker
  assertEquals(computeJokerHand("AAAAA"), HANDS.FiveOfAKind);
  // 1 joker
  assertEquals(computeJokerHand("AAAAJ"), HANDS.FiveOfAKind);
  assertEquals(computeJokerHand("AAA3J"), HANDS.FourOfAKind);
  assertEquals(computeJokerHand("AA33J"), HANDS.FullHouse);
  assertEquals(computeJokerHand("AA23J"), HANDS.ThreeOfAKind);
  assertEquals(computeJokerHand("A423J"), HANDS.OnePair);
  // 2 joker
  assertEquals(computeJokerHand("AAAJJ"), HANDS.FiveOfAKind);
  assertEquals(computeJokerHand("AA2JJ"), HANDS.FourOfAKind);
  assertEquals(computeJokerHand("A32JJ"), HANDS.ThreeOfAKind);
});
