import { group, summary, bench, compact, run } from "mitata";

import HeapHeap from "heap";
import { Heap as HeapJsHeap } from "heap-js";
import { BinaryHeap } from "../../dist";


group("Pop 100 thousand", () => {
    const size = 100_000;
    const array = Array.from(Array(size).keys());
    const heapArray = BinaryHeap.from(array).array;

    summary(() => {
        compact(() => {
            bench("heap's binary heap", () => {
                const heap = new HeapHeap();
                heap.nodes = heapArray.slice();
                for (let i = 0; i < size; i++) { heap.pop(); }
            }).gc("inner");

            bench("heap-js's binary heap", () => {
                const heap = new HeapJsHeap();
                heap.heapArray = heapArray.slice();
                for (let i = 0; i < size; i++) { heap.pop(); }
            }).gc("inner");

            bench("all-the-heap's binary heap", () => {
                const heap = new BinaryHeap();
                heap.array = heapArray.slice();
                for (let i = 0; i < size; i++) { heap.pop(); }
            }).gc("inner");
        });
    });
});

await run();