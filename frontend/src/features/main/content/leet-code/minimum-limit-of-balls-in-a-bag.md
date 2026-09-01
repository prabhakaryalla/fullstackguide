# 1760. Minimum Limit of Balls in a Bag

**Difficulty:** Medium
**Category:** Array, Binary Search

## Problem

Given `nums`, where `nums[i]` is the number of balls in bag `i`, and an integer `maxOperations`, in one operation you may split a bag with `y > 1` balls into two bags containing any positive number of balls summing to `y`. Return the minimum possible value of the maximum bag size, using at most `maxOperations` splits.

### Example

```
Input: nums = [9], maxOperations = 2
Output: 3
```

## Approach

Binary search on the answer (the maximum allowed bag size `x`). For a candidate `x`, splitting a bag of `num` balls into pieces no larger than `x` requires `ceil(num / x) - 1` operations; the candidate is feasible if the total operations across all bags does not exceed `maxOperations`.

## C# Solution

```csharp
public class Solution
{
    public int MinimumSize(int[] nums, int maxOperations)
    {
        int lo = 1, hi = nums.Max();

        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            long operations = 0;
            foreach (int num in nums)
                operations += (num + mid - 1) / mid - 1;

            if (operations <= maxOperations) hi = mid;
            else lo = mid + 1;
        }

        return lo;
    }
}
```

## Complexity

- **Time:** `O(n log(max(nums)))`.
- **Space:** `O(1)`.
