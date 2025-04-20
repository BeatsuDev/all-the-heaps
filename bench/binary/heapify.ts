import { group, summary, bench, compact, run, do_not_optimize } from "mitata";

import HeapHeap from "heap";
import { Heap as HeapJsHeap } from "heap-js";
import { BinaryHeap } from "../../dist";


group("Heapify 1 million - best case", () => {
    const size = 1_000_000;
    const array = Array.from(Array(size).keys());
    summary(() => {
        compact(() => {
            bench("heap's binary heap", () => {
                do_not_optimize(HeapHeap.heapify(array.slice()));
            }).gc("inner");

            bench("heap-js's binary heap", () => {
                do_not_optimize(HeapJsHeap.heapify(array.slice()));
            }).gc("inner");

            bench("all-the-heap's binary heap", () => {
                do_not_optimize(BinaryHeap.from(array.slice()));
            }).gc("inner");
        });
    });
});

group("Heapify 1 million - worst case", () => {
    const size = 1_000_000;
    const array = Array.from(Array(size).keys()).sort((a, b) => b - a);
    summary(() => {
        compact(() => {
            bench("heap's binary heap", () => {
                do_not_optimize(HeapHeap.heapify(array.slice()));
            }).gc("inner");

            bench("heap-js's binary heap", () => {
                do_not_optimize(HeapJsHeap.heapify(array.slice()));
            }).gc("inner");

            bench("all-the-heap's binary heap", () => {
                do_not_optimize(BinaryHeap.from(array.slice()));
            }).gc("inner");
        });
    });
});

await run();