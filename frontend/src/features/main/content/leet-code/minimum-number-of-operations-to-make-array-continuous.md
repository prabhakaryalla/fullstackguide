# 2009. Minimum Number of Operations to Make Array Continuous

**Difficulty:** Hard
**Category:** Array, Hash Table, Binary Search, Sliding Window, Sorting

## Problem

You are given an integer array `nums`. In one operation, you can replace any element of `nums` with any value. `nums` is considered **continuous** if, after sorting, the array consists of consecutive integers with no duplicates (i.e. `nums[i + 1] - nums[i] == 1` for all valid `i`, and every value is distinct). Return *the minimum number of operations to make `nums` continuous*.

## Approach

Deduplicate and sort the array first — duplicates are wasted slots we'll need to overwrite anyway, so we only need to reason about the sorted set of **unique** values.

We want to keep as many original elements as possible and replace the rest. A set of kept elements is valid if they all fit within some window of `n` consecutive integers (where `n` is the original array length), since the remaining replaced slots can always fill in the gaps to make a contiguous run of length `n`.

Using a sliding window over the sorted unique array: for each right endpoint, shrink the left endpoint while `unique[right] - unique[left] >= n`. The window `[left, right]` represents values that could all be kept simultaneously. Track the largest such window size, `best`. The answer is `n - best`.

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(int[] nums)
    {
        int n = nums.Length;
        var unique = nums.Distinct().OrderBy(x => x).ToArray();
        int m = unique.Length;
        int left = 0;
        int best = 0;

        for (int right = 0; right < m; right++)
        {
            while (unique[right] - unique[left] >= n)
                left++;
            best = Math.Max(best, right - left + 1);
        }

        return n - best;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for sorting the deduplicated array; the sliding window itself is `O(n)`.
- **Space:** `O(n)` for the deduplicated array.
