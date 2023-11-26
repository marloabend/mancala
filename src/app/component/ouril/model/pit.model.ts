export class Pit {

  private readonly index: number;
  private value: number;

  constructor(index: number, value: number = 0) {
    this.index = index;
    this.value = value;
  }

  static emptyPits(count: number): Pit[] {
    return Array(count)
      .fill(0)
      .map(((_, index) => (new Pit(index, 4))));
  }

  getIndex(): number {
    return this.index;
  }

  getValue(): number {
    return this.value;
  }

  isEmpty(): boolean {
    return this.value <= 0;
  }

  put(count: number): void {
    this.value += count;
  }

  collect(): number {
    const count = this.value;
    this.value = 0;
    return count;
  }
}
