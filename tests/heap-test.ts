import { describe, expect, it } from "bun:test";

import type { Heap } from "../src/common";

/**
 * Dynamically creates test suite for a given heap type.
 * @param createHeap Function that creates and returns a new heap.
 */
export function createHeapTestSuite(createHeap: <T>() => Heap<T>) {
    describe(`${createHeap().constructor.name}: Generic tests`, () => {
        it("can initialize empty binary heap", () => {
            const heap = createHeap();
            expect(heap.array).toBeEmpty();
        });

        it("can push values to binary heap", () => {
            const heap = createHeap();
            const values = [1, 2, 3];
            values.forEach((v) => heap.push(v));
            values.forEach((v) => expect(heap.array.includes(v)).toBe(true));
        });

        it("peek returns top element", () => {
            const heap = createHeap();
            heap.push(99);
            expect(heap.peek()).toBe(99);
        });

        it("peek returns undefined if heap is empty", () => {
            const heap = createHeap();
            expect(heap.peek()).toBeUndefined();
        });

        it("pop returns and removes top element", () => {
            const heap = createHeap();
            heap.push(99);
            expect(heap.pop()).toBe(99);
            expect(heap.array).toBeEmpty();
        });

        it("popping empty heap returns undefined", () => {
            const heap = createHeap();
            expect(heap.pop()).toBeUndefined();
        });

        it("heap stores in min heap by default", () => {
            const heap = createHeap();
            heap.push(1);
            heap.push(3);
            heap.push(2);

            expect(heap.pop()).toBe(1);
            expect(heap.pop()).toBe(2);
            expect(heap.pop()).toBe(3);
        });
    });
}
