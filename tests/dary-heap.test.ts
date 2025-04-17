import { describe, it, expect } from "bun:test";

import { createHeapTestSuite } from "./heap-test";
import { DAryHeap } from "../src/dary-heap";

createHeapTestSuite(() => new DAryHeap(3));

describe("NAryHeap", () => {
    it("can create heap from array", () => {
        const heap = DAryHeap.from([4, 3, 2, 1], 3);
        expect(heap.pop()).toBe(1);
        expect(heap.pop()).toBe(2);
        expect(heap.pop()).toBe(3);
        expect(heap.pop()).toBe(4);
    });

    it("can use custom comparator", () => {
        type Dog = { name: string };
        const dog1 = { name: "woofer" };
        const dog2 = { name: "goof" };

        const heap = DAryHeap.from<Dog>(
            [dog1, dog2],
            3,
            (a, b) => b.name.length - a.name.length
        );

        expect(heap.pop()).toBe(dog1);
        expect(heap.pop()).toBe(dog2);
    });

    it(
        "is fast on huge array",
        () => {
            const size = 100_000;
            const heap = DAryHeap.from(
                Array.from(Array(size).keys()),
                3,
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

    it("1-ary heap", () => {
        const heap = DAryHeap.from(Array.from(Array(10).keys()), 1);

        for (let i = 0; i < 10; i++) {
            expect(heap.pop()).toBe(i);
        }
    });

    it("10-ary heap", () => {
        const heap = DAryHeap.from(Array.from(Array(100).keys()), 10);

        for (let i = 0; i < 100; i++) {
            expect(heap.pop()).toBe(i);
        }
    });
});
