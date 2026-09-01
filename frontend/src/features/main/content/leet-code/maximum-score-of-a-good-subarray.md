# 1793. Maximum Score of a Good Subarray

**Difficulty:** Hard
**Category:** Array, Two Pointers, Binary Search, Stack, Greedy

## Problem

Given an array `nums` and an index `k`, the score of a subarray `(i, j)` with `i <= k <= j` is `(j - i + 1) * min(nums[i..j])`. Return the maximum score of a good subarray (one that contains index `k`).

### Example

```
Input: nums = [1,4,3,7,4,5], k = 3
Output: 15
```

## Approach

Start with the single-element subarray `[k, k]` and greedily expand one side at a time using two pointers: at each step, extend toward whichever neighboring element (just outside the left or right boundary) is larger, since that choice preserves the running minimum the longest. Track the running minimum and the best score (`length * minimum`) seen throughout the expansion until both boundaries reach the array's ends.

## C# Solution

```csharp
public class Solution
{
    public int MaximumScore(int[] nums, int k)
    {
        int n = nums.Length;
        int left = k, right = k;
        int minVal = nums[k];
        int best = minVal;

        while (left > 0 || right < n - 1)
        {
            if (left == 0)
                right++;
            else if (right == n - 1)
                left--;
            else if (nums[left - 1] >= nums[right + 1])
                left--;
            else
                right++;

            minVal = Math.Min(minVal, Math.Min(nums[left], nums[right]));
            best = Math.Max(best, minVal * (right - left + 1));
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
