# 259. 3Sum Smaller

**Difficulty:** Medium
**Category:** Array, Two Pointers, Binary Search, Sorting

## Problem

Given an array of `n` integers `nums` and an integer `target`, return the number of index triplets `i < j < k` such that `nums[i] + nums[j] + nums[k] < target`.

### Example

```
Input: nums = [-2,0,1,3], target = 2
Output: 2
```

### Constraints

- `0 <= nums.length <= 3500`
- `-100 <= nums[i] <= 100`

## Approach

Sort the array, then fix the smallest index `i` and use two pointers `left = i + 1` and `right = n - 1` scanning inward. If `nums[i] + nums[left] + nums[right] < target`, then every pair `(left, x)` for `left < x <= right` also satisfies the condition (since the array is sorted), so add `right - left` to the count and advance `left`. Otherwise, decrement `right`.

## C# Solution

```csharp
public class Solution
{
    public int ThreeSumSmaller(int[] nums, int target)
    {
        Array.Sort(nums);
        int count = 0;

        for (int i = 0; i < nums.Length - 2; i++)
        {
            int left = i + 1, right = nums.Length - 1;
            while (left < right)
            {
                if (nums[i] + nums[left] + nums[right] < target)
                {
                    count += right - left;
                    left++;
                }
                else
                {
                    right--;
                }
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n^2)` — a two-pointer scan for each fixed first index.
- **Space:** `O(log n)` to `O(n)` — for the sort.
