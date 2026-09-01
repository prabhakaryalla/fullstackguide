# 1802. Maximum Value at a Given Index in a Bounded Array

**Difficulty:** Medium
**Category:** Array, Binary Search, Greedy

## Problem

Construct an array `nums` of `n` positive integers such that `nums[i] <= nums[i+1] + 1` is not required, but each adjacent pair differs by at most `1`, all values are positive, the sum of all elements is at most `maxSum`, and `nums[index]` is as large as possible. Return the maximum possible value of `nums[index]`.

### Example

```
Input: n = 4, index = 2, maxSum = 6
Output: 2
Explanation: nums = [1,1,2,1] has sum 5 <= 6 and nums[2] = 2 is the maximum achievable.
```

## Approach

Binary search on the candidate peak value `v` at `index`. For a given peak, the minimum possible sum is obtained by decreasing by 1 on each side until reaching 1 and then staying at 1 — this is computed in closed form with `Sum(peak, count)`, which sums an arithmetic run of length `count` starting at `peak` and floored at `1`. Binary search the largest `v` such that `v + Sum(v-1, left) + Sum(v-1, right) <= maxSum`, where `left`/`right` are the number of elements strictly to the left/right of `index`.

## C# Solution

```csharp
public class Solution
{
    public int MaxValue(int n, int index, int maxSum)
    {
        long left = index, right = n - 1 - index;
        long lo = 1, hi = maxSum;

        while (lo < hi)
        {
            long mid = lo + (hi - lo + 1) / 2;
            long total = mid + Sum(mid - 1, left) + Sum(mid - 1, right);
            if (total <= maxSum) lo = mid; else hi = mid - 1;
        }

        return (int)lo;
    }

    private long Sum(long peak, long count)
    {
        if (peak >= count) return (peak + peak - count + 1) * count / 2;
        return peak * (peak + 1) / 2 + (count - peak);
    }
}
```

## Complexity

- **Time:** `O(log(maxSum))` — binary search with `O(1)` work per check.
- **Space:** `O(1)`.
