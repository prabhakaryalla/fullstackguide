# 698. Partition to K Equal Sum Subsets

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Backtracking, Bitmask

## Problem

Given an integer array `nums` and an integer `k`, return `true` if it's possible to divide the array into `k` non-empty subsets with equal sums.

### Example

```
Input: nums = [4,3,2,3,5,2,4], k = 4
Output: true
Explanation: Four subsets each summing to 5: (5), (1,4), (2,3), (2,3)
```

## Approach

If the total sum isn't divisible by `k`, or the largest element exceeds the target subset sum, no valid partition exists. Otherwise, sort numbers in descending order (placing hard-to-place large numbers first prunes the search faster) and use backtracking: fill one subset at a time by trying to add each unused number that doesn't exceed the remaining target; once a subset hits the target sum exactly, start filling the next subset. If an empty subset can't be completed by any number choice, no arrangement starting there can work, so stop early.

## C# Solution

```csharp
public class Solution
{
    public bool CanPartitionKSubsets(int[] nums, int k)
    {
        int sum = nums.Sum();
        if (sum % k != 0) return false;

        int target = sum / k;
        Array.Sort(nums);
        Array.Reverse(nums);

        if (nums[0] > target) return false;

        var used = new bool[nums.Length];
        return Backtrack(nums, used, k, 0, 0, target);
    }

    private bool Backtrack(int[] nums, bool[] used, int remainingGroups, int startIndex, int currentSum, int target)
    {
        if (remainingGroups == 0) return true;

        if (currentSum == target)
            return Backtrack(nums, used, remainingGroups - 1, 0, 0, target);

        for (int i = startIndex; i < nums.Length; i++)
        {
            if (used[i] || currentSum + nums[i] > target) continue;

            used[i] = true;
            if (Backtrack(nums, used, remainingGroups, i + 1, currentSum + nums[i], target))
                return true;

            used[i] = false;

            if (currentSum == 0) break;
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(k * 2^n)` in the worst case, though pruning makes it much faster in practice.
- **Space:** `O(n)` for the used-tracking array and recursion stack.
