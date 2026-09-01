# 786. K-th Smallest Prime Fraction

**Difficulty:** Medium
**Category:** Array, Binary Search, Heap

## Problem

Given a sorted array of distinct primes `arr` and an integer `k`, consider every fraction `arr[i] / arr[j]` where `0 <= i < j < arr.length`. Return the `k`-th smallest such fraction as a two-element array `[numerator, denominator]`.

### Example

```
Input: arr = [1,2,3,5], k = 3
Output: [2,5]
```

## Approach

For each numerator index `i`, the smallest fraction involving `arr[i]` uses the largest possible denominator, `arr[n-1]`. Seed a min-heap with these `n-1` smallest fractions, one per numerator index. Repeatedly extract the current smallest fraction; each time a fraction `(i, j)` is popped, push the next-smallest fraction sharing the same numerator index, which uses the next smaller denominator index `j - 1` (as long as it stays greater than `i`). After `k` extractions, the last popped fraction is the answer.

## C# Solution

```csharp
public class Solution
{
    public int[] KthSmallestPrimeFraction(int[] arr, int k)
    {
        int n = arr.Length;
        var heap = new PriorityQueue<(int, int), double>();

        for (int i = 0; i < n - 1; i++)
            heap.Enqueue((i, n - 1), (double)arr[i] / arr[n - 1]);

        (int, int) result = (0, 0);

        for (int i = 0; i < k; i++)
        {
            heap.TryDequeue(out result, out _);
            var (numIdx, denIdx) = result;

            if (denIdx - 1 > numIdx)
                heap.Enqueue((numIdx, denIdx - 1), (double)arr[numIdx] / arr[denIdx - 1]);
        }

        return new[] { arr[result.Item1], arr[result.Item2] };
    }
}
```

## Complexity

- **Time:** `O((n + k) log n)`.
- **Space:** `O(n)` for the heap.
