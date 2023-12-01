export const isNumber = (input: string): boolean => !isNaN(parseInt(input));

export const getLines = (input: string): string[] =>
  input.split("\n").filter((e) => !!e);

export const sum = (input: number[]): number =>
  input.reduce((acc, e) => e + acc);
