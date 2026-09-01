# 16. 3Sum Closest

**Difficulty:** Medium
**Category:** Array, Two Pointers, Sorting

## Problem

Given an integer array `nums` of length `n` and an integer `target`, find three integers in `nums` such that the sum is closest to `target`.

Return the sum of the three integers. You may assume that each input would have exactly one solution.

### Example 1

```
Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
```

### Example 2

```
Input: nums = [0,0,0], target = 1
Output: 0
```

### Constraints

- `3 <= nums.length <= 500`
- `-1000 <= nums[i] <= 1000`
- `-10^4 <= target <= 10^4`

## Approach

Sort the array, then for each fixed index `i`, use two pointers to scan the remaining range for the sum closest to `target`. Track the best (closest) sum seen, moving `left`/`right` based on whether the current sum is above or below `target`.

## C# Solution

```csharp
public class Solution
{
    public int ThreeSumClosest(int[] nums, int target)
    {
        Array.Sort(nums);
        int closestSum = nums[0] + nums[1] + nums[2];

        for (int i = 0; i < nums.Length - 2; i++)
        {
            int left = i + 1, right = nums.Length - 1;

            while (left < right)
            {
                int sum = nums[i] + nums[left] + nums[right];

                if (Math.Abs(target - sum) < Math.Abs(target - closestSum))
                {
                    closestSum = sum;
                }

                if (sum == target) return sum;
                if (sum < target) left++;
                else right--;
            }
        }

        return closestSum;
    }
}
```

## Complexity

- **Time:** `O(n^2)` — sorting plus a two-pointer scan per fixed element.
- **Space:** `O(1)` extra.
