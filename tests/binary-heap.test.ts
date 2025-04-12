import { it, expect } from "bun:test";

import { BinaryHeap } from "../src";

it("can initialize empty binary heap", () => {
    const heap = new BinaryHeap();
    expect(heap.array).toBeEmpty();
});

it("can push values to binary heap", () => {
    const heap = new BinaryHeap();
    const values = [1, 2, 3];
    values.forEach((v) => heap.push(v));
    values.forEach((v) => expect(heap.array.includes(v)).toBe(true));
});

it("peek returns top element", () => {
    const heap = new BinaryHeap();
    heap.push(99);
    expect(heap.peek()).toBe(99);
});

it("peek returns undefined if heap is empty", () => {
    const heap = new BinaryHeap();
    expect(heap.peek()).toBeUndefined();
});

it("pop returns and removes top element", () => {
    const heap = new BinaryHeap();
    heap.push(99);
    expect(heap.pop()).toBe(99);
    expect(heap.array).toBeEmpty();
});

it("popping empty heap returns undefined", () => {
    const heap = new BinaryHeap();
    expect(heap.pop()).toBeUndefined();
});

it("heap stores in min heap by default", () => {
    const heap = new BinaryHeap();
    heap.push(1);
    heap.push(3);
    heap.push(2);

    expect(heap.pop()).toBe(1);
    expect(heap.pop()).toBe(2);
    expect(heap.pop()).toBe(3);
});

it("can create heap from array", () => {
    const heap = BinaryHeap.from([3, 2, 1]);
    expect(heap.pop()).toBe(1);
    expect(heap.pop()).toBe(2);
    expect(heap.pop()).toBe(3);
});

it("can use custom comparator", () => {
    type Dog = { name: string };
    const dog1 = { name: "woofer" };
    const dog2 = { name: "goof" };

    const heap = BinaryHeap.from<Dog>([dog1, dog2], (a, b) => b.name.length - a.name.length);

    expect(heap.pop()).toBe(dog1);
    expect(heap.pop()).toBe(dog2);
});

it(
    "is fast on huge array",
    () => {
        const size = 100_000;
        const heap = BinaryHeap.from(Array.from(Array(size).keys()), (a, b) => b - a);

        // This would be 1 billion comparisons in O(n) time complexity. Good enough test
        // to verify O(log n) time complexity
        for (let i = size - 1; i > size - 10_000; i--) {
            expect(heap.pop()).toBe(i);
        }
    },
    {
        timeout: 1000,
    }
);
