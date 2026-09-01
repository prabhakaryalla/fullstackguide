# 1354. Construct Target Array With Multiple Sums

**Difficulty:** Hard
**Category:** Array, Heap (Priority Queue), Math

## Problem

Given a `target` array, determine if it could have been formed by starting from an all-ones array of the same length and repeatedly replacing one element with the sum of the whole array.

### Example

```
Input: target = [9,3,5]
Output: true
```

## Approach

Work backwards using a max-heap. The largest value `m` must have been produced as the sum of the array right before the last operation, so its previous value equals `m - rest`, where `rest` is the sum of all other elements. Repeatedly replace the max with this reduced value until every element is `1` (success). To avoid excessive iterations when the max is much larger than the rest, use the modulo shortcut `m % rest` to batch many identical reductions into one step (falling back to `rest` itself if the remainder would be `0`, and failing if no reduction occurs because `m <= rest`).

## C# Solution

```csharp
public class Solution
{
    public bool IsPossible(int[] target)
    {
        int n = target.Length;
        if (n == 1) return target[0] == 1;

        long sum = 0;
        var maxHeap = new PriorityQueue<long, long>();
        foreach (var t in target)
        {
            sum += t;
            maxHeap.Enqueue(t, -t);
        }

        while (true)
        {
            maxHeap.TryDequeue(out long m, out _);
            if (m == 1) return true;

            long rest = sum - m;
            if (rest == 0) return false;

            long v = m % rest;
            if (v == 0) v = rest;
            if (v == m) return false;

            sum = rest + v;
            maxHeap.Enqueue(v, -v);
        }
    }
}
```

## Complexity

- **Time:** `O(n log n * log(max(target)))` due to the modulo-batched reductions.
- **Space:** `O(n)` for the heap.
