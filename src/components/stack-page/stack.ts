interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  /*private */ stackArray: T[] = [];

  push(item: T): void {
    this.stackArray.push(item);
  }
  pop() {
    if (this.stackArray.length > 0) {
      this.stackArray.pop();
    }
  }
  clear() {
    this.stackArray = [];
  }
}
