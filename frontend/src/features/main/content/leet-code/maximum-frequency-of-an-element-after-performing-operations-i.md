# 3346. Maximum Frequency of an Element After Performing Operations I

**Difficulty:** Medium
**Category:** Array, Binary Search, Sliding Window, Sorting, Prefix Sum

## Problem

You are given an integer array `nums` and two integers `k` and `numOperations`. You must perform `numOperations` operations, each selecting an index not previously selected and adding an integer in `[-k, k]` to `nums[i]`.

Return the maximum possible frequency of any element in `nums` after performing the operations.

### Example

Input: `nums = [1,4,5], k = 1, numOperations = 2`

Output: `2`

## Approach

For a chosen target value `V`, any original element within distance `k` of `V` can be converted to exactly `V` using one operation, and elements already equal to `V` need no operation at all.

The optimal target is always achievable at one of the existing array values. For each candidate `V = nums[i]`:
- Let `windowSize` be the count of elements in `[V - k, V + k]` (found via binary search on the sorted array).
- Let `countEqual` be the number of elements already exactly equal to `V`.
- The achievable frequency at `V` is `min(windowSize, countEqual + numOperations)` (we can convert at most `numOperations` of the other elements in the window, but never more than the window itself).

Track the maximum achievable frequency across all candidates.

## C# Solution

```csharp
public class Solution 
{
    public int MaxFrequency(int[] nums, int k, int numOperations) 
    {
        int n = nums.Length;
        int[] sorted = (int[])nums.Clone();
        Array.Sort(sorted);

        var freq = new Dictionary<int, int>();
        foreach (int v in nums) freq[v] = freq.GetValueOrDefault(v, 0) + 1;

        int ans = 0;
        for (int i = 0; i < n; i++)
        {
            int target = nums[i];
            int lo = LowerBound(sorted, target - k);
            int hi = UpperBound(sorted, target + k) - 1;
            int windowSize = hi - lo + 1;
            int countEqual = freq.GetValueOrDefault(target, 0);
            int achievable = Math.Min(windowSize, countEqual + numOperations);
            ans = Math.Max(ans, achievable);
        }
        return ans;
    }

    private int LowerBound(int[] arr, int value)
    {
        int lo = 0, hi = arr.Length;
        while (lo < hi)
        {
            int mid = (lo + hi) / 2;
            if (arr[mid] < value) lo = mid + 1; else hi = mid;
        }
        return lo;
    }

    private int UpperBound(int[] arr, int value)
    {
        int lo = 0, hi = arr.Length;
        while (lo < hi)
        {
            int mid = (lo + hi) / 2;
            if (arr[mid] <= value) lo = mid + 1; else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting and binary searches.
- **Space:** O(n) for the sorted array and frequency map.
