# 3767. Maximize Points After Choosing K Tasks

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Heap (Priority Queue)

## Problem

Given arrays `technique1` and `technique2` of length `n` and an integer `k`, each task `i` can be completed using technique 1 (earning `technique1[i]`) or technique 2 (earning `technique2[i]`). At least `k` tasks must use technique 1. Return the maximum total points achievable.

### Example

Input: `technique1 = [5,2,10], technique2 = [10,3,8], k = 2`
Output: `22`

## Approach

Start by assuming every task uses technique 1 (satisfies the `>= k` requirement). For each task compute `delta = technique2[i] - technique1[i]`; switching a task to technique 2 gains `delta`. Sort deltas descending and greedily switch up to `n - k` tasks (only when the delta is positive), since at least `k` tasks must remain on technique 1.

## C# Solution

```csharp
public class Solution 
{
    public long MaxPoints(int[] technique1, int[] technique2, int k) 
    {
        int n = technique1.Length;
        long total = 0;
        var deltas = new int[n];
        for (int i = 0; i < n; i++)
        {
            total += technique1[i];
            deltas[i] = technique2[i] - technique1[i];
        }
        Array.Sort(deltas);
        Array.Reverse(deltas);

        int allowedSwitches = n - k;
        for (int i = 0; i < allowedSwitches; i++)
        {
            if (deltas[i] <= 0) break;
            total += deltas[i];
        }
        return total;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
