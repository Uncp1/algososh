import { getFibonacciArray } from "./utils/sequence";

describe("function creates correct sequence", () => {
  it("for i=0", () => {
    const fibonacciArray = getFibonacciArray(0);
    expect(fibonacciArray).toEqual([0]);
  });
  it("for i=1", () => {
    const fibonacciArray = getFibonacciArray(1);
    expect(fibonacciArray).toEqual([0, 1]);
  });
  it("for i=7", () => {
    const fibonacciArray = getFibonacciArray(8);
    expect(fibonacciArray).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21]);
  });
});
