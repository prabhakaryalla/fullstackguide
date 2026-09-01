# 3576. Transform Array to All Equal Elements

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem
You are given an integer array `nums` of size `n` containing only `1` and `-1`, and an integer `k`.

You can perform the following operation at most `k` times: choose an index `i` (`0 <= i < n - 1`) and multiply both `nums[i]` and `nums[i + 1]` by `-1`. The same index may be chosen multiple times across different operations.

Return `true` if it is possible to make all elements of the array equal after at most `k` operations, `false` otherwise.

### Example

```
Input: nums = [1,-1,1,-1,1], k = 3
Output: true
Explanation: Flip (1,2): [1,1,-1,-1,1]. Flip (2,3): [1,1,1,1,1]. Done in 2 operations (<= 3).
```

```
Input: nums = [-1,-1,-1,1,1,1], k = 5
Output: false
```

**Constraints:**
- `1 <= n == nums.length <= 10^5`
- `1 <= k <= n`

## Approach
For a fixed target value (`1` or `-1`), scan the array left to right. Whenever the current position doesn't match the target, the only way to fix it (without disturbing already-fixed earlier positions) is to flip the current position together with the next one, which also toggles the next position's sign; continue scanning. If, after this pass, the last element still doesn't match the target, that target is unreachable no matter how many operations are allowed (the reachable sign patterns are fixed once the greedy pass fails). Otherwise, the number of flips performed is the minimum number of operations needed for that target. Since the operation limit is "at most `k`", it's feasible whenever the minimum for either target (`1` or `-1`) is at most `k`.

## C# Solution

```csharp
public class Solution 
{
    public bool CanMakeEqual(int[] nums, int k) 
    {
        long cost1 = MinOpsToTarget(nums, 1);
        long costNeg1 = MinOpsToTarget(nums, -1);
        return Math.Min(cost1, costNeg1) <= k;
    }

    private long MinOpsToTarget(int[] nums, int target)
    {
        int n = nums.Length;
        int[] arr = (int[])nums.Clone();
        long count = 0;

        for (int i = 0; i < n - 1; i++)
        {
            if (arr[i] != target)
            {
                arr[i] = -arr[i];
                arr[i + 1] = -arr[i + 1];
                count++;
            }
        }

        if (arr[n - 1] != target) return long.MaxValue;
        return count;
    }
}
```

## Complexity

- **Time:** O(n), for the two linear greedy simulations.
- **Space:** O(n), for the cloned working arrays.
