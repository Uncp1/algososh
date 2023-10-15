import { getFibonacciArray } from "./utils/sequence";

describe("buba", () => {
  it("i=0", () => {
    const fibonacciArray = getFibonacciArray(0);
    expect(fibonacciArray).toEqual([1]);
  });
  it("i=1", () => {
    const fibonacciArray = getFibonacciArray(1);
    expect(fibonacciArray).toEqual([1]);
  });
});
