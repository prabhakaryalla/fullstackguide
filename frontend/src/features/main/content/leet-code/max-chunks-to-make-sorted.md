# 769. Max Chunks To Make Sorted

**Difficulty:** Medium
**Category:** Stack, Array, Greedy, Sorting, Monotonic Stack

## Problem

Given an array `arr` that is a permutation of `[0, 1, ..., n-1]`, split it into the maximum number of contiguous chunks such that sorting each chunk individually and concatenating them produces the fully sorted array. Return the maximum number of chunks.

### Example

```
Input: arr = [1,0,2,3,4]
Output: 4
```

## Approach

Since `arr` is a permutation of `0` to `n-1`, track the running maximum value seen while scanning left to right. A valid chunk boundary occurs at index `i` exactly when the running maximum equals `i` — meaning every value `0` through `i` has already appeared, so the current prefix can be safely isolated as one sorted chunk.

## C# Solution

```csharp
public class Solution
{
    public int MaxChunksToSorted(int[] arr)
    {
        int chunks = 0;
        int maxSoFar = 0;

        for (int i = 0; i < arr.Length; i++)
        {
            maxSoFar = Math.Max(maxSoFar, arr[i]);
            if (maxSoFar == i) chunks++;
        }

        return chunks;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra.
