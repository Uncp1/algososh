type QueueDataTypes<T> = {
  array: (T | string)[];
  head: number;
  tail: number;
};

interface IQueue<T> {
  enqueue: (value: T) => QueueDataTypes<T>;
  dequeue: () => QueueDataTypes<T>;
  clear: () => QueueDataTypes<T>;
  getElements: () => (T | string)[];
  getLength: () => number;
}

export class Queue<T> implements IQueue<T> {
  queueArray: (T | string)[] = [];
  head = 0;
  tail = 0;
  length: number = 0;
  private readonly size: number = 0;

  constructor(size: number) {
    this.size = size;
    this.queueArray = this.createInitialArray(size);
  }

  private createInitialArray(size: number): string[] {
    const array: string[] = [];
    for (let i = 0; i < size; i++) {
      array.push("");
    }
    return array;
  }

  enqueue(value: T): QueueDataTypes<T> {
    if (this.length === this.size) this.returnData();
    if (this.tail === this.size) this.tail = 0;
    this.queueArray[this.tail] = value;
    this.length++;
    this.tail++;
    return this.returnData();
  }

  dequeue(): QueueDataTypes<T> {
    if (this.length === 0) this.returnData();
    this.queueArray[this.head % this.size] = "";
    this.length--;
    this.head++;
    if (this.head === this.size) this.head = 0;
    return this.returnData();
  }

  clear(): QueueDataTypes<T> {
    this.queueArray = this.createInitialArray(this.size);
    this.length = 0;
    this.head = 0;
    this.tail = 0;
    return this.returnData();
  }

  getElements(): (T | string)[] {
    return this.queueArray;
  }

  getLength(): number {
    return this.length;
  }

  private returnData(): QueueDataTypes<T> {
    return {
      array: this.queueArray,
      head: this.head,
      tail: this.tail,
    };
  }
}
