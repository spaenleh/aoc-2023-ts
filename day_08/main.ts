import { getLines } from "../utils.ts";

const getInput = (): Promise<string> => Deno.readTextFile(`./input.txt`);

const endCondition = (n: string) => n.endsWith("Z");
const startCondition = (n: string) => n.endsWith("A");

export const partOne = (input: string): number => {
  const [rawInstr, ...lines] = getLines(input);
  // parse intut of nodes
  const instructions = Array.from(rawInstr.trim()) as ("L" | "R")[];
  const instrLength = Array.from(instructions).filter(Boolean).length;

  const network = lines.reduce<{ [key: string]: { "L": string; "R": string } }>(
    (acc, l) => {
      const [node, rest] = l.split("=").map((e) => e.trim());
      const [left, right] = rest.replaceAll("(", "").replaceAll(")", "")
        .split(", ");
      acc[node] = { "L": left, "R": right };
      return acc;
    },
    {},
  );

  // start iterating
  let hops = 0;
  let currentNode = "AAA";

  while (currentNode !== "ZZZ") {
    currentNode = network[currentNode][instructions[hops % instrLength]];
    hops += 1;
  }
  return hops;
};

export const partTwo = (input: string): number => {
  const [rawInstr, ...lines] = getLines(input);
  // parse intut of nodes
  const instructions = Array.from(rawInstr.trim()) as ("L" | "R")[];
  const instrLength = Array.from(instructions).filter(Boolean).length;

  const network = lines.reduce<{ [key: string]: { "L": string; "R": string } }>(
    (acc, l) => {
      const [node, rest] = l.split("=").map((e) => e.trim());
      const [left, right] = rest.replaceAll("(", "").replaceAll(")", "")
        .split(", ");
      acc[node] = { "L": left, "R": right };
      return acc;
    },
    {},
  );

  // find all starting nodes (they end in A)
  const startingNodes = Object.keys(network).filter(startCondition);
  const chains = startingNodes.map((n) => {
    let currentNode = n;
    let hops = 0;
    while (!endCondition(currentNode)) {
      currentNode = network[currentNode][instructions[hops % instrLength]];
      hops += 1;
    }
    return { start: n, end: currentNode, length: hops };
  });
  console.log(chains);
  const gcd = (a: number, b: number): number => b == 0 ? a : gcd(b, a % b);
  const lcm = (a: number, b: number): number => a / gcd(a, b) * b;
  const res = chains.map((c) => c.length).reduce(lcm, 1);
  return res;
};

if (import.meta.main) {
  console.log(partOne(await getInput()));
  console.log(partTwo(await getInput()));
}
