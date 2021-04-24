/**
 * Return an array in a specific range
 * @param x initial value in the range included
 * @param y final value in the range not included
 * @returns range
 */
export const range = (x: number, y: number) => {
  const result: number[] = [];
  for (let i = x; i < y; i++) {
    result.push(i);
  }
  return result;
};
