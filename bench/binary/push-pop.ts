import { group, summary, bench, compact, run } from "mitata";

import HeapHeap from "heap";
import { Heap as HeapJsHeap } from "heap-js";
import { BinaryHeap } from "../../dist";


group("Push pop 100 thousand - best case", () => {
    const size = 100_000;
    summary(() => {
        compact(() => {
            bench("heap's binary heap", () => {
                const heap = new HeapHeap();
                for (let i = 0; i < size; i++) { heap.push(i); }
                for (let i = 0; i < size; i++) { heap.pop(); }
            }).gc("inner");

            bench("heap-js's binary heap", () => {
                const heap = new HeapJsHeap();
                for (let i = 0; i < size; i++) { heap.push(i); }
                for (let i = 0; i < size; i++) { heap.pop(); }
            }).gc("inner");

            bench("all-the-heap's binary heap", () => {
                const heap = new BinaryHeap();
                for (let i = 0; i < size; i++) { heap.push(i); }
                for (let i = 0; i < size; i++) { heap.pop(); }
            }).gc("inner");
        });
    });
});

group("Push pop 100 thousand - worst case", () => {
    const size = 100_000;
    summary(() => {
        compact(() => {
            bench("heap's binary heap", () => {
                const heap = new HeapHeap();
                for (let i = size-1; i >= 0; i--) { heap.push(i); }
                for (let i = size-1; i >= 0; i--) { heap.pop(); }
            }).gc("inner");

            bench("heap-js's binary heap", () => {
                const heap = new HeapJsHeap();
                for (let i = size-1; i >= 0; i--) { heap.push(i); }
                for (let i = size-1; i >= 0; i--) { heap.pop(); }
            }).gc("inner");

            bench("all-the-heap's binary heap", () => {
                const heap = new BinaryHeap();
                for (let i = size-1; i >= 0; i--) { heap.push(i); }
                for (let i = size-1; i >= 0; i--) { heap.pop(); }
            }).gc("inner");
        });
    });
});

await run();