# 1546. Maximum Number of Non-Overlapping Subarrays With Sum Equals Target

**Difficulty:** Medium
**Category:** Array, Hash Table, Greedy, Prefix Sum

## Problem

Given an array `nums` and an integer `target`, return the maximum number of non-overlapping subarrays whose sum equals `target`.

### Example

```
Input: nums = [1,1,1,1,1], target = 2
Output: 2
```

## Approach

Greedily scan left to right while maintaining a running prefix sum and a hash set of previously seen prefix sums (starting with `0`). Whenever `prefixSum - target` exists in the set, a valid subarray ending here is found — greedily take it immediately (since taking the earliest-ending valid subarray never hurts future opportunities), increment the count, and reset the tracking state (clear the set back to just `{0}`, reset the running prefix sum to `0`) so that the next subarray cannot overlap with this one.

## C# Solution

```csharp
public class Solution
{
    public int MaxNonOverlapping(int[] nums, int target)
    {
        var seen = new HashSet<int> { 0 };
        int prefixSum = 0;
        int count = 0;

        foreach (int num in nums)
        {
            prefixSum += num;

            if (seen.Contains(prefixSum - target))
            {
                count++;
                seen.Clear();
                seen.Add(0);
                prefixSum = 0;
            }
            else
            {
                seen.Add(prefixSum);
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the array.
- **Space:** `O(n)` for the set of seen prefix sums.
