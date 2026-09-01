# 1439. Find the Kth Smallest Sum of a Matrix With Sorted Rows

**Difficulty:** Hard
**Category:** Array, Binary Search, Matrix, Heap (Priority Queue)

## Problem

Given an `m x n` matrix where each row is sorted in non-decreasing order, and an integer `k`, choose exactly one element from each row and sum them. Return the `k`-th smallest possible sum.

### Example

```
Input: mat = [[1,3,11],[2,4,6]], k = 5
Output: 7
```

## Approach

Process rows one at a time, maintaining the `k` smallest achievable sums using only the rows seen so far. Merging the current list of sums with the next row's values is exactly the "k smallest pairs from two sorted arrays" problem: use a min-heap seeded with the smallest pair, and repeatedly pop the smallest sum while pushing its neighboring, not-yet-visited pairs, stopping after `k` sums have been extracted. After folding in every row, the `k`-th smallest overall sum is the last (largest) entry retained.

## C# Solution

```csharp
public class Solution
{
    public int KthSmallest(int[][] mat, int k)
    {
        int[] sums = mat[0];

        for (int r = 1; r < mat.Length; r++)
            sums = MergeKSmallest(sums, mat[r], k);

        return sums[Math.Min(k, sums.Length) - 1];
    }

    private int[] MergeKSmallest(int[] a, int[] b, int k)
    {
        var pq = new PriorityQueue<(int Sum, int I, int J), int>();
        var visited = new HashSet<(int, int)>();

        pq.Enqueue((a[0] + b[0], 0, 0), a[0] + b[0]);
        visited.Add((0, 0));

        var result = new List<int>();

        while (result.Count < k && pq.Count > 0)
        {
            var (sum, i, j) = pq.Dequeue();
            result.Add(sum);

            if (i + 1 < a.Length && visited.Add((i + 1, j)))
                pq.Enqueue((a[i + 1] + b[j], i + 1, j), a[i + 1] + b[j]);

            if (j + 1 < b.Length && visited.Add((i, j + 1)))
                pq.Enqueue((a[i] + b[j + 1], i, j + 1), a[i] + b[j + 1]);
        }

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(rows * k * log k)`.
- **Space:** `O(k)` for the retained sums and heap at each step.
