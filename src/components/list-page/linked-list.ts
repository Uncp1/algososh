export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  prev: LinkedListNode<T> | null;

  constructor(
    value: T,
    next?: LinkedListNode<T> | null,
    prev?: LinkedListNode<T> | null
  ) {
    this.value = value;
    this.next = next === undefined ? null : next;
    this.prev = prev === undefined ? null : prev;
  }
}

export class LinkedList<T> {
  private head: LinkedListNode<T> | null;
  private tail: LinkedListNode<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(value: T) {
    const newNode = new LinkedListNode(value);
    if (this.head) this.head.prev = newNode;
    newNode.next = this.head;
    this.head = newNode;
    if (!this.tail) this.tail = newNode;
    return newNode;
  }

  append(value: T) {
    const newNode = new LinkedListNode(value);
    if (this.tail) this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
    if (!this.head) this.head = newNode;
    return newNode;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }
    const deletedHead = this.head;
    if (this.head.next) {
      this.head = this.head.next;
      this.head.prev = null;
    } else {
      this.head = null;
      this.tail = null;
    }
    return deletedHead;
  }

  deleteTail() {
    if (!this.tail) {
      return null;
    }
    const deletedTail = this.tail;
    if (this.tail.prev) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      this.head = null;
      this.tail = null;
    }
    return deletedTail;
  }

  addByIndex(value: T, index: number): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }
    if (index === 0) {
      return this.prepend(value);
    }

    let currentNode: LinkedListNode<T> | null = this.head;
    let currentIndex: number = 0;

    while (currentNode && currentIndex < index) {
      currentNode = currentNode.next;
      currentIndex++;
    }

    let previousNode = currentNode?.prev;
    let newNode = new LinkedListNode(value, currentNode, previousNode);

    if (previousNode) previousNode.next = newNode;
    if (currentNode) currentNode.prev = newNode;
    return newNode;
  }

  deleteByIndex(index: number): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    if (index === 0) {
      return this.deleteHead();
    }

    let currentNode: LinkedListNode<T> | null = this.head;
    let currentIndex: number = 0;

    while (currentNode && currentIndex < index) {
      currentNode = currentNode?.next || null;
      currentIndex++;
    }
    let deletedNode = currentNode;

    if (deletedNode && deletedNode.prev) {
      deletedNode.prev.next = deletedNode.next || null;
    }

    if (deletedNode && deletedNode.next) {
      deletedNode.next.prev = deletedNode.prev || null;
    }
    return deletedNode;
  }

  fromArray(values: T[]): LinkedList<T> {
    values.forEach((value) => this.append(value));
    return this;
  }

  toArray(): LinkedListNode<T>[] {
    const nodes: LinkedListNode<T>[] = [];
    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  }

  reset(): void {
    this.head = null;
    this.tail = null;
  }
}
