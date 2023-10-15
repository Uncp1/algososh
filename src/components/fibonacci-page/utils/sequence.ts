export const getFibonacciArray = (value: number): number[] => {
  let fibonacciArray: number[] = [];
  for (let i = 0; i < +value + 1; i++) {
    if (fibonacciArray.length === 0 || fibonacciArray.length === 1) {
      fibonacciArray.push(1);
    } else {
      fibonacciArray.push(fibonacciArray[i - 2] + fibonacciArray[i - 1]);
    }
  }
  return fibonacciArray;
};
