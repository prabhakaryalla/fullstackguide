# 1983. Widest Pair of Indices With Equal Range Sum

**Difficulty:** Medium
**Category:** Array, Hash Table, Prefix Sum
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given two binary arrays `nums1` and `nums2` of the same length, find the maximum width `j - i` (0-indexed, `i <= j`) such that `sum(nums1[i..j]) == sum(nums2[i..j])`, or `0` if no such pair exists.

### Example

```
Input: nums1 = [1,1,0,0,0,0], nums2 = [0,1,1,0,0,0]
Output: 4
Explanation: The subarray from index 1 to 4 in both has equal sum (1) — wait width computed as j-i+1 or j-i depending on convention; the widest matching-sum window spans indices 0..3 (width 4).
```

### Constraints

- `n == nums1.length == nums2.length`
- `1 <= n <= 10^5`
- `nums1[i]` and `nums2[i]` are either `0` or `1`.

## Approach

Define `diff[i] = (prefix sum of nums1 up to i) - (prefix sum of nums2 up to i)` for `i` from `0` to `n` (prefix sums, with `diff[0] = 0`). The range `[i+1, j]` has equal sums in both arrays exactly when `diff[j] == diff[i]`. Track, in a dictionary, the earliest index at which each `diff` value was first seen; for every later index with the same `diff` value, compute the width and keep the maximum.

## C# Solution

```csharp
public class Solution
{
    public int WidestPairOfIndices(int[] nums1, int[] nums2)
    {
        int n = nums1.Length;
        var firstIndex = new Dictionary<int, int>();
        firstIndex[0] = 0;

        int diff = 0;
        int best = 0;

        for (int i = 1; i <= n; i++)
        {
            diff += nums1[i - 1] - nums2[i - 1];

            if (firstIndex.TryGetValue(diff, out int idx))
            {
                best = Math.Max(best, i - idx);
            }
            else
            {
                firstIndex[diff] = i;
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass tracking prefix sum differences.
- **Space:** `O(n)` for the dictionary of first-seen indices.
