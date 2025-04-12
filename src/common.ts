/**
 * @template T
 * @param {T} item1 - Any item that can be ordered.
 * @param {T} item2 - An item that can be ordered relative to the first item.
 * @returns {number} A number representing the order of two elements. A negative number can be
 * interpreted as "item1 is less than item2". Zero means they are considered equal in order. A
 * positive number can be interpreted as "item1 is greater than item2".
 *
 * @example
 * // Orders numbers in ascending order
 * const comparator: Comparator = (a, b) => a - b;
 *
 * @example
 * // Orders Dogs in descending name length order
 * type Dog = { name: string };
 * const comparator: Comparator<Dog> = (a, b) => b.name.length - a.name.length;
 */
export type Comparator<T> = (item1: T, item2: T) => number;

/**
 * An interface describing the required methods for making use of any heap structure.
 *
 * Some heap implementations may include more methods such as pushpop (faster than
 * each done individually).
 */
export interface Heap<T> {
    pop(): T;
    push(item: T): void;
    peek(): T;
}
