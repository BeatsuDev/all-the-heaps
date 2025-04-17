import { describe, it, expect } from "bun:test";

import { BinaryHeap } from "../src";
import { createHeapTestSuite } from "./heap-test";

createHeapTestSuite(() => new BinaryHeap());

describe("BinaryHeap", () => {
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

        const heap = BinaryHeap.from<Dog>(
            [dog1, dog2],
            (a, b) => b.name.length - a.name.length
        );

        expect(heap.pop()).toBe(dog1);
        expect(heap.pop()).toBe(dog2);
    });

    it(
        "is fast on huge array",
        () => {
            const size = 100_000;
            const heap = BinaryHeap.from(
                Array.from(Array(size).keys()),
                (a, b) => b - a
            );

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
});
