# 3656. Determine if a Simple Graph Exists

**Difficulty:** Medium
**Category:** Graph, Greedy, Math

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a degree sequence `degrees` for `n` vertices, determine whether a simple undirected graph (no self-loops or multi-edges) exists whose vertices have exactly these degrees.

### Example

`degrees = [1,1]` is realizable by a single edge between the two vertices. `degrees = [3,1,1,1]` on 4 vertices is also realizable (a star graph).

## Approach

Use the Erdős–Gallai theorem: the sequence is graphical if and only if the sum of degrees is even, and for every `k` from 1 to `n`, the sum of the `k` largest degrees is at most `k(k-1) + sum of min(degree[i], k)` over the remaining vertices.

## C# Solution

```csharp
public class Solution 
{
    public bool IsSimpleGraphPossible(int[] degrees) 
    {
        int n = degrees.Length;
        long sum = 0;
        foreach (var d in degrees) 
        {
            if (d < 0 || d > n - 1) return false;
            sum += d;
        }
        if (sum % 2 != 0) return false;

        int[] sorted = (int[])degrees.Clone();
        Array.Sort(sorted);
        Array.Reverse(sorted);

        for (int k = 1; k <= n; k++) 
        {
            long leftSum = 0;
            for (int i = 0; i < k; i++) leftSum += sorted[i];

            long rightSum = 0;
            for (int i = k; i < n; i++) rightSum += Math.Min(sorted[i], k);

            if (leftSum > (long)k * (k - 1) + rightSum) return false;
        }
        return true;
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(n)
