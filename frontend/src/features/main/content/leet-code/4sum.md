# 18. 4Sum

**Difficulty:** Medium
**Category:** Array, Two Pointers, Sorting

## Problem

Given an array `nums` of `n` integers and an integer `target`, return all unique quadruplets `[nums[a], nums[b], nums[c], nums[d]]` such that the four indices are distinct and `nums[a] + nums[b] + nums[c] + nums[d] == target`.

The solution set must not contain duplicate quadruplets.

### Example 1

```
Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
```

### Example 2

```
Input: nums = [2,2,2,2,2], target = 8
Output: [[2,2,2,2]]
```

### Constraints

- `1 <= nums.length <= 200`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`

## Approach

This generalizes 3Sum by one more level: sort the array, fix the first two indices with nested loops (skipping duplicates), then use two pointers on the remaining range for the last two indices — same converging-pointer technique as 3Sum.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> FourSum(int[] nums, int target)
    {
        Array.Sort(nums);
        var result = new List<IList<int>>();
        int n = nums.Length;

        for (int a = 0; a < n - 3; a++)
        {
            if (a > 0 && nums[a] == nums[a - 1]) continue;

            for (int b = a + 1; b < n - 2; b++)
            {
                if (b > a + 1 && nums[b] == nums[b - 1]) continue;

                int left = b + 1, right = n - 1;

                while (left < right)
                {
                    long sum = (long)nums[a] + nums[b] + nums[left] + nums[right];

                    if (sum == target)
                    {
                        result.Add(new List<int> { nums[a], nums[b], nums[left], nums[right] });
                        while (left < right && nums[left] == nums[left + 1]) left++;
                        while (left < right && nums[right] == nums[right - 1]) right--;
                        left++;
                        right--;
                    }
                    else if (sum < target)
                    {
                        left++;
                    }
                    else
                    {
                        right--;
                    }
                }
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n^3)` — two nested loops plus a two-pointer scan.
- **Space:** `O(1)` extra (excluding the output).
