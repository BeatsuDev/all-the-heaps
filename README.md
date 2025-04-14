# All the heaps!

All the heaps exports several different heap implementations so that you can
"plug in" any implementation you want while using the same interface. Some heaps
might be faster in some cases, so instead of rewriting your code to check every
implementation, just swap out the implementation that you import!

```ts
import { BinaryHeap as Heap } from "all-the-heaps";

const heap = new Heap();
```

```ts
import { NAryHeap as Heap } from "all-the-heaps";

const heap = new Heap();  // Voilá! You now have a tertiary heap by default
const heap = new Heap(10) // Or a 10-ary heap.
```


## Installation
```
npm i all-the-heaps
```

## Usage
```ts
import { BinaryHeap } from "all-the-heaps";

// Create from array
const heap = BinaryHeap.from([3, 2, 1]);

// Min heap
const heap = new BinaryHeap();

// Max heap
const heap = new BinaryHeap((a, b) => b - a);

// Custom data types
type Dog = { name: string };
const heap = new BinaryHeap<Dog>((a, b) => a.name.length - b.name.length);

// Pushing, popping and peeking
heap.push({ name: "Woofy" });
heap.peek() // { name: "Woofy" }
heap.pop() // { name: "Woofy" }

heap.peek() // undefined
heap.pop() // undefined
```

## Roadmap
- [x] Binary heap
- [ ] D-ary heap
- [ ] Skew heap
- [ ] Binomial heap
- [ ] Pairing heap
- [ ] Fibonacci heap
- [ ] Brodal heap