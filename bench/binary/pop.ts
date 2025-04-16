import { group, summary, bench, compact, run } from "mitata";

import HeapHeap from "heap";
import { Heap as HeapJsHeap } from "heap-js";
import { BinaryHeap } from "../../dist";


group("Pop 1 million", () => {
    const size = 1_000_000;
    const array = Array.from(Array(size).keys());

    const heapHeap = HeapHeap.heapify(array);
    const heapJsHeap = HeapJsHeap.heapify(array);
    const binaryHeap = BinaryHeap.from(array);

    summary(() => {
        compact(() => {
            bench("heap's binary heap", () => {
                for (let i = 0; i < size; i++) { heapHeap.pop(); }
            }).gc("inner");

            bench("heap-js's binary heap", () => {
                for (let i = 0; i < size; i++) { heapJsHeap.pop(); }
            }).gc("inner");

            bench("all-the-heap's binary heap", () => {
                for (let i = 0; i < size; i++) { binaryHeap.pop(); }
            }).gc("inner");
        });
    });
});

await run();