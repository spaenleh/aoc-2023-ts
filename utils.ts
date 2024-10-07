export const isNumber = (input: string): boolean => !isNaN(parseInt(input));

export const getLines = (input: string): string[] =>
  input.split("\n").filter((e) => !!e);

export const getBlocks = (input: string): string[] => input.split("\n\n");

export const sum = (list: number[]): number =>
  list.reduce((acc, e) => e + acc, 0);

// simple function to multiply a list of numbers together
export const multiply = (list: number[]): number =>
  list.reduce((a, b) => a *= b, 1);

export const transposeArray = (arr: string[][]) =>
  arr[0].map((_, colIndex) => arr.map((row) => row[colIndex]));
