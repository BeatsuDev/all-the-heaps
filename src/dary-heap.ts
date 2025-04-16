import type { Comparator, Heap } from "./common";

/**
 * A complete n-ary tree implementation of a heap.
 *
 * Instead of just two child nodes each, the N-ary heap supports any number of children
 * per node. Higher N reduces the amount of operations for siftup by reducing the height of the
 * tree, but increases the amount of operations for the sift down operation.
 * Sift up is used for insertions, while sift down is used for popping.
 */
export class DAryHeap<T = number> implements Heap<T> {
    n: number;
    array: T[];
    readonly comparator: Comparator<T>;

    /**
     * Create an n-ary heap from an array of items.
     * @param array An array of items to create the heap from.
     * @returns an n-ary heap from the given items in the array.
     */
    static from<T>(array: Array<T>, n: number, comparator?: (a: T, b: T) => number): DAryHeap<T> {
        const heap = comparator ? new DAryHeap<T>(n, comparator) : new DAryHeap<T>(n);
        heap.array = array;
        for (let i = Math.floor(array.length / n) - 1; i >= 0; i--) {
            heap.siftDown(i);
        }
        return heap;
    }

    /**
     * Creates a new NAryHeap.
     * @param comparator Function used to compare the order of one number to another.
     *
     * The default comparator uses the difference `-` of elements to compare the order of elements.
     * If you explicitly give the NAryHeap a different type (e.g. NAryHeap<string>), you MUST
     * specify a valid comparator as the first argument of the constructor
     *
     * @example
     * const correct1 = new NAryHeap(3);  // This is fine
     * const wrong = new NAryHeap<string>(3);  // Will result in a runtime error
     * const correct2 = new NAryHeap<string>(3, (a, b) => a.length - b.length);  // This is also fine
     *
     * @example
     */
    constructor(n: number, comparator: Comparator<T> = ((a: number, b: number) => a - b) as Comparator<T>) {
        // The type cast in the constructor argument default value above "loses" information.
        // The generic type T can still be explicitly set without a comparator given, resulting in
        // a potentially non-functional comparator. The alternative would be to create a seperate
        // static method for creating a default binary heap, but I much prefer this syntax.
        this.n = n;
        this.array = [];
        this.comparator = comparator;
    }

    static getParentIndex(n: number, index: number): number {
        return Math.floor((index - 1) / n);
    }

    static getNthChildIndex(n: number, treeN: number, index: number): number {
        return treeN * index + n;
    }

    #swap(index1: number, index2: number): void {
        // Assumes valid indexes
        [this.array[index1], this.array[index2]] = [this.array[index2], this.array[index1]];
    }

    #compare(index1: number, index2: number): number {
        // Assumes valid indexes
        return this.comparator(this.array[index1], this.array[index2]);
    }

    logChildren(index: number) {
        const children = Array.from(Array(this.n).keys())
            .map(x => x + 1)
            .map(x => DAryHeap.getNthChildIndex(x, this.n, index))
        console.log(children);
    }

    siftDown(index: number): void {
        // Assumes valid index
        while (true) {
            let firstChildIndex = DAryHeap.getNthChildIndex(1, this.n, index);
            if (firstChildIndex >= this.array.length) return;

            const childIndexes = Array.from(Array(this.n).keys())
                .map(n => firstChildIndex + n);
            const smallestChildIndex = childIndexes
                .filter(x => x < this.array.length)
                .reduce((a, b) => (this.#compare(a, b) < 0 ? a : b));
            if (this.#compare(index, smallestChildIndex) < 0) return;

            this.#swap(smallestChildIndex, index);
            index = smallestChildIndex;
        }
    }

    siftUp(index: number): void {
        // Assumes valid index
        let parentIndex = DAryHeap.getParentIndex(this.n, index);
        while (parentIndex >= 0 && this.#compare(parentIndex, index) > 0) {
            this.#swap(index, parentIndex);
            index = parentIndex;
            parentIndex = DAryHeap.getParentIndex(this.n, index);
        }
    }

    pop(): T | undefined {
        if (this.array.length === 0) return;

        this.#swap(0, this.array.length - 1);
        const value = this.array.pop();
        this.siftDown(0);

        return value;
    }

    push(item: T): void {
        this.array.push(item);
        this.siftUp(this.array.length - 1);
    }

    peek(): T | undefined {
        return this.array[0];
    }
}
