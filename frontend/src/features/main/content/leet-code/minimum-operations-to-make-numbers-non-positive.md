# 2702. Minimum Operations to Make Numbers Non-positive

**Difficulty:** Hard
**Category:** Array, Binary Search, Greedy
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a 0-indexed integer array `nums` and two positive integers `x` and `y`, with `x > y`. In one operation (one "second"), you must choose an index `i` and:

- decrease `nums[i]` by `x`, and
- decrease every other index `j != i` by `y`.

Return the minimum number of operations required to make every element of `nums` less than or equal to 0.

### Example

```
Input: nums = [3, 4, 1, 7, 6], x = 4, y = 2
Output: 4
```

## Approach

Binary search on the answer `t` (the total number of seconds). If we run the process for `t` seconds and index `i` is chosen as the "special" index `a_i` times (0 <= a_i <= t), then index `i`'s total reduction equals `a_i * x + (t - a_i) * y`. For `nums[i]` to reach non-positive, we need `a_i * (x - y) >= nums[i] - t * y`, i.e. `a_i >= ceil((nums[i] - t*y) / (x - y))` whenever that quantity is positive (0 otherwise). A given `t` is feasible exactly when the sum of these minimum required `a_i` values across all indices is at most `t`, since the "special" picks must be distributed across `t` total operations. Binary search the smallest feasible `t`.

## C# Solution

```csharp
public class Solution
{
    public int MinOperations(int[] nums, int x, int y)
    {
        int lo = 0, hi = nums.Max();

        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (IsFeasible(nums, x, y, mid))
            {
                hi = mid;
            }
            else
            {
                lo = mid + 1;
            }
        }

        return lo;
    }

    private bool IsFeasible(int[] nums, int x, int y, long t)
    {
        long required = 0;
        long diff = x - y;

        foreach (int num in nums)
        {
            long threshold = num - t * y;
            if (threshold > 0)
            {
                required += (threshold + diff - 1) / diff;
                if (required > t)
                {
                    return false;
                }
            }
        }

        return required <= t;
    }
}
```

## Complexity

- **Time:** O(n log(max(nums))), where n is the length of `nums`.
- **Space:** O(1).
