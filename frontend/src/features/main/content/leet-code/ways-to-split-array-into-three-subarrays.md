# 1712. Ways to Split Array Into Three Subarrays

**Difficulty:** Medium
**Category:** Array, Two Pointers, Binary Search, Prefix Sum

## Problem

Given an array `nums`, find the number of ways to split it into three contiguous, non-empty subarrays `left`, `mid`, `right` such that `sum(left) <= sum(mid)` and `sum(mid) <= sum(right)`. Return the count modulo `10^9 + 7`.

### Example

```
Input: nums = [1,1,1]
Output: 1
```

## Approach

Use prefix sums. Fix the end of `left` at index `i`; the valid range for the end of `mid` (index `j`) must satisfy `prefix[j] - prefix[i] >= prefix[i]` (so `mid >= left`) and `prefix[j] <= (total + prefix[i]) / 2` (so `mid <= right`). Since the prefix array is strictly increasing, both bounds can be found with binary search for each `i`.

## C# Solution

```csharp
public class Solution
{
    public int WaysToSplit(int[] nums)
    {
        const int Mod = 1_000_000_007;
        int n = nums.Length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];
        long total = prefix[n];
        long ways = 0;

        for (int i = 1; i < n - 1; i++)
        {
            long left = prefix[i];

            int lo = i + 1, hi = n - 1, low = n;
            while (lo <= hi)
            {
                int mid = lo + (hi - lo) / 2;
                if (prefix[mid] - left >= left) { low = mid; hi = mid - 1; }
                else lo = mid + 1;
            }

            lo = i + 1; hi = n - 1; int high = i;
            while (lo <= hi)
            {
                int mid = lo + (hi - lo) / 2;
                if (2 * prefix[mid] <= total + left) { high = mid; lo = mid + 1; }
                else hi = mid - 1;
            }

            if (high >= low) ways = (ways + high - low + 1) % Mod;
        }

        return (int)ways;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the prefix sums.
