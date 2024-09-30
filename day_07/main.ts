import { getLines, sum } from "../utils.ts";

const getInput = (): Promise<string> =>
  Deno.readTextFile(new URL(`./input.txt`, import.meta.url));

export const HANDS = {
  FiveOfAKind: "FiveOfAKind",
  FourOfAKind: "FourOfAKind",
  FullHouse: "FullHouse",
  ThreeOfAKind: "ThreeOfAKind",
  TwoPair: "TwoPair",
  OnePair: "OnePair",
  HighCard: "HighCard",
} as const;
const AllHands = [
  HANDS.FiveOfAKind,
  HANDS.FourOfAKind,
  HANDS.FullHouse,
  HANDS.ThreeOfAKind,
  HANDS.TwoPair,
  HANDS.OnePair,
  HANDS.HighCard,
] as const;

type HandUnion = typeof HANDS[keyof typeof HANDS];

type Hand = {
  originalHand: string;
  hand: HandUnion;
  bid: number;
};
const CardCompare = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
] as const;

const CardCompare2 = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
] as const;

export const getHandType = (
  hand: string,
): typeof AllHands[number] => {
  const cards = Array.from(hand).reduce<{ [key: string]: number }>((acc, c) => {
    acc[c] ? acc[c] += 1 : acc[c] = 1;
    return acc;
  }, {});
  const diffCardCount = Object.keys(cards).length;
  switch (diffCardCount) {
    case 1:
      // AAAAA
      return HANDS.FiveOfAKind;
    case 2: {
      if (Object.values(cards).find((count) => count === 4)) {
        // AAAA2
        return HANDS.FourOfAKind;
      } else {
        // AAA22
        return HANDS.FullHouse;
      }
    }
    case 3: {
      const doubledCards =
        Object.entries(cards).filter(([_, count]) => count === 2).length;
      if (doubledCards === 2) {
        // AA332
        return HANDS.TwoPair;
      } else {
        // AAA32
        return HANDS.ThreeOfAKind;
      }
    }
    case 4: {
      if (Object.values(cards).find((c) => c == 2)) {
        // AA432
        return HANDS.OnePair;
      } else {
        // A5432
        return HANDS.HighCard;
      }
    }
    default: {
      return HANDS.HighCard;
    }
  }
};
const compareHands = (
  g1: Hand,
  g2: Hand,
  comparator: typeof CardCompare | typeof CardCompare2 = CardCompare,
): number => {
  const order1 = AllHands.indexOf(g1.hand);
  const order2 = AllHands.indexOf(g2.hand);
  if (order1 < order2) {
    return 1;
  } else if (order1 > order2) {
    return -1;
  } else {
    // cards have the same type
    const card1Ord = Array.from(g1.originalHand).map((c) =>
      comparator.indexOf(c as typeof comparator[number])
    );
    const card2Ord = Array.from(g2.originalHand).map((c) =>
      comparator.indexOf(c as typeof comparator[number])
    );
    return card1Ord.map((c1, idx) => c1 - card2Ord[idx]).filter(Boolean)[0] > 0
      ? -1
      : 1;
  }
};

export const improveHand = (handType: HandUnion, hand: string) => {
  const numJokers = Array.from(hand).filter((l) => l === "J").length;
  switch (numJokers) {
    case 0:
      return handType;
    case 1: {
      switch (handType) {
        case HANDS.FourOfAKind:
          return HANDS.FiveOfAKind;
        case HANDS.ThreeOfAKind:
          return HANDS.FourOfAKind;
        case HANDS.TwoPair:
          return HANDS.FullHouse;
        case HANDS.OnePair:
          return HANDS.ThreeOfAKind;
        case HANDS.HighCard:
          return HANDS.OnePair;
        default:
          return handType;
      }
    }
    case 2: {
      switch (handType) {
        case HANDS.FullHouse:
          return HANDS.FiveOfAKind;
        case HANDS.TwoPair:
          return HANDS.FourOfAKind;
        case HANDS.HighCard:
          return HANDS.ThreeOfAKind;
        case HANDS.OnePair:
          return HANDS.ThreeOfAKind;
        default:
          return handType;
      }
    }
    case 3: {
      switch (handType) {
        case HANDS.FullHouse:
          return HANDS.FiveOfAKind;
        case HANDS.ThreeOfAKind:
          return HANDS.FourOfAKind;
        default:
          return handType;
      }
    }
    case 4: {
      return HANDS.FiveOfAKind;
    }
    default:
      return handType;
  }
};

export const partOne = (input: string): number => {
  const lines = getLines(input);
  // parse lines into hands and bids
  const game = lines.map((l) => {
    const [originalHand, bid] = l.split(" ");
    const hand: Hand = {
      originalHand,
      hand: getHandType(originalHand),
      bid: parseInt(bid),
    };
    return hand;
  });
  game.sort(compareHands);
  return sum(game.map((g, idx) => g.bid * (idx + 1)));
};

export const partTwo = (input: string): number => {
  const lines = getLines(input);
  // parse lines into hands and bids
  const game = lines.map((l) => {
    const [originalHand, bid] = l.split(" ");
    const hand: Hand = {
      originalHand,
      hand: improveHand(getHandType(originalHand), originalHand),
      bid: parseInt(bid),
    };
    return hand;
  });
  game.sort((g1, g2) => compareHands(g1, g2, CardCompare2));
  return sum(game.map((g, idx) => g.bid * (idx + 1)));
};

if (import.meta.main) {
  console.log(partOne(await getInput()));
  console.log(partTwo(await getInput()));
}
