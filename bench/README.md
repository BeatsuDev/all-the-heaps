# Library benchmarks

This directory contains benchmarks comparing all-the-heaps implementations with other popular libraries.
[Mitata](https://github.com/evanwashere/mitata) is used to benchmark and compare the heaps.

A lot of these results are very surprising to me. This is also the first time I'm benchmarking JS code,
so the results should therefore be used tentatively. Please give me feedback if you think these benchmarks
are misconfigured, of poor quality, or could be improved in any way!

If you have experience with profiling Javascript library code, I would love you to share you experience 
and which tools you use. Leave a comment in the
[first announcement discussion posted to the GitHub repo](https://github.com/BeatsuDev/all-the-heaps/discussions/1).

## Run the benchmarks

> Note: Ensure you have installed all dependencies to run the benchmarks.

```
bun --expose-gc --allow-natives-syntax bench/<heap-type>/<benchmark>.ts
```

## Results

`all-the-heaps@0.3.0` is *fast* compared to `heap-js@2.6.0`. However, it only beats `heap@0.2.7` in heapify. For pushing and popping values, `heap@0.2.7` is a clear winner in terms of speed - *for now 😉*.

![Speed comparison for all-the-heaps, heap-js and heap](./assets/overall-comparison.png)
