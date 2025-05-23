import type { Comparator, Heap } from "./common";

/**
 * A complete binary tree implementation of a heap.
 *
 * The binary heap stores the data in an underlying array and is a min-heap by default, meaning the
 * top-most node is the smallest. Make it a max-heap by passing the comparator: `(a, b) => b - a`; to
 * the constructor. The comparator should return a negative number when any node compared to a
 * descendant of it is in correct order.
 *
 * Take the following max heap (`(a, b) => b - a`) as an example:
 * ```
 *       5
 *      / \
 *     2   3
 * ```
 * We know logically that this heap is a correct max heap by looking at it. Using the comparator
 * function we can programmatically check that it's correct by asserting that every parent compared
 * to their children (note that the order here matters: PARENT compared to CHILDREN) return a negative
 * number. Comparing 5 to 3, we would get 3 - 5 === -2, a negative number. With 5 and 2 we would get
 * -3, also a negative number.
 */
export class BinaryHeap<T = number> implements Heap<T> {
    array: T[];
    readonly comparator: Comparator<T>;

    /**
     * Create a binary heap from an array of items.
     * @param array An array of items to create a binary heap from.
     * @returns a binary heap from the given items in the array.
     */
    static from<T>(
        array: Array<T>,
        comparator?: (a: T, b: T) => number
    ): BinaryHeap<T> {
        const heap = comparator
            ? new BinaryHeap<T>(comparator)
            : new BinaryHeap<T>();
        heap.array = array;
        for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
            heap.siftDown(i);
        }
        return heap;
    }

    /**
     * Creates a new BinaryHeap.
     * @param comparator Function used to compare the order of one number to another.
     *
     * The default comparator uses the difference `-` of elements to compare the order of elements.
     * If you explicitly give the BinaryHeap a different type (e.g. BinaryHeap<string>), you MUST
     * specify a valid comparator as the first argument of the constructor
     *
     * @example
     * const correct1 = new BinaryHeap();  // This is fine
     * const wrong = new BinaryHeap<string>();  // Will result in a runtime error
     * const correct2 = new BinaryHeap<string>((a, b) => a.length - b.length);  // This is also fine
     */
    constructor(
        comparator: Comparator<T> = ((a: number, b: number) =>
            a - b) as Comparator<T>
    ) {
        // The type cast in the constructor argument default value above "loses" information.
        // The generic type T can still be explicitly set without a comparator given, resulting in
        // a potentially non-functional comparator. The alternative would be to create a seperate
        // static method for creating a default binary heap, but I much prefer this syntax.
        this.array = [];
        this.comparator = comparator;
    }

    static getParentIndex(index: number): number {
        return (index - 1) >> 1;
    }

    static getLeftChildIndex(index: number): number {
        return 2 * index + 1;
    }

    static getRightChildIndex(index: number): number {
        return 2 * index + 2;
    }

    #swap(index1: number, index2: number): void {
        // Assumes valid indexes
        [this.array[index1], this.array[index2]] = [
            this.array[index2],
            this.array[index1],
        ];
    }

    #compare(index1: number, index2: number): number {
        // Assumes valid indexes
        return this.comparator(this.array[index1], this.array[index2]);
    }

    // Assumes valid index
    siftDown(index: number): void {
        const value = this.array[index];

        // This is the last node with a child/children
        const end = BinaryHeap.getParentIndex(this.array.length - 1);
        while (index <= end) {
            let left = BinaryHeap.getLeftChildIndex(index);
            let right = BinaryHeap.getRightChildIndex(index);
            let childIndex =
                right >= this.array.length || this.#compare(left, right) < 0
                    ? left
                    : right;

            if (this.comparator(value, this.array[childIndex]) < 0) break;
            this.array[index] = this.array[childIndex];
            index = childIndex;
        }

        this.array[index] = value;
    }

    siftUp(index: number): void {
        // Assumes valid index
        const value = this.array[index];

        let parentIndex = BinaryHeap.getParentIndex(index);
        while (
            parentIndex >= 0 &&
            this.comparator(this.array[parentIndex], value) > 0
        ) {
            // Move only parent to child
            this.array[index] = this.array[parentIndex];
            index = parentIndex;
            parentIndex = BinaryHeap.getParentIndex(index);
        }

        this.array[index] = value;
    }

    pop(): T | undefined {
        if (this.array.length === 0) return;
        if (this.array.length === 1) return this.array.pop();

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
