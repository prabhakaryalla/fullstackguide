# 3768. Minimum Inversion Count in Subarrays of Fixed Length

**Difficulty:** Hard
**Category:** Array, Segment Tree, Sliding Window

## Problem

Given an integer array `nums` of length `n` and an integer `k`, an inversion is a pair `(i, j)` with `i < j` and `nums[i] > nums[j]`. Return the minimum inversion count among all subarrays of length `k`.

### Example

Input: `nums = [3,1,2,5,4], k = 3`
Output: `0`

## Approach

Use a Fenwick tree (BIT) over coordinate-compressed values to track counts of elements in the current window. Build the first window by adding elements one at a time (each addition contributes inversions equal to the count of already-present elements greater than it). To slide the window: add the new right element (inversions added = count of larger elements currently in the BIT), then remove the leftmost element (inversions removed = count of smaller elements currently in the BIT). Track the minimum inversion count across all windows.

## C# Solution

```csharp
public class Solution 
{
    public long MinInversions(int[] nums, int k) 
    {
        int n = nums.Length;
        int[] sorted = (int[])nums.Clone();
        Array.Sort(sorted);
        int m = 0;
        var rankMap = new Dictionary<int, int>();
        foreach (int v in sorted)
            if (!rankMap.ContainsKey(v)) rankMap[v] = m++;

        var bit = new long[m + 1];
        void Update(int rank, int delta)
        {
            for (int i = rank + 1; i <= m; i += i & (-i)) bit[i] += delta;
        }
        long Query(int rank)
        {
            long sum = 0;
            for (int i = rank; i > 0; i -= i & (-i)) sum += bit[i];
            return sum;
        }

        long inversions = 0;
        int inserted = 0;
        for (int i = 0; i < k; i++)
        {
            int rank = rankMap[nums[i]];
            long greater = inserted - Query(rank + 1);
            inversions += greater;
            Update(rank, 1);
            inserted++;
        }

        long best = inversions;
        for (int l = 0; l + k < n; l++)
        {
            int r = l + k;
            int rankR = rankMap[nums[r]];
            long greater = inserted - Query(rankR + 1);
            inversions += greater;
            Update(rankR, 1);
            inserted++;

            int rankL = rankMap[nums[l]];
            long less = Query(rankL);
            inversions -= less;
            Update(rankL, -1);
            inserted--;

            best = Math.Min(best, inversions);
        }
        return best;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
