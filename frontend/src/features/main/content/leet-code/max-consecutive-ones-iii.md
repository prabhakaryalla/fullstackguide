# 1004. Max Consecutive Ones III

**Difficulty:** Medium
**Category:** Array, Binary Search, Sliding Window

## Problem

Given a binary array `nums` and an integer `k`, return the maximum number of consecutive `1`s in the array if you can flip at most `k` `0`s to `1`s.

### Example

```
Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
```

## Approach

Use a sliding window `[left, right]` that tracks the count of zeros currently inside it. Expand `right` each step; whenever the zero count exceeds `k`, shrink from `left` until it's within budget again. The window length at every step is a candidate answer, so track the maximum.

## C# Solution

```csharp
public class Solution
{
    public int LongestOnes(int[] nums, int k)
    {
        int left = 0, zeroCount = 0, best = 0;

        for (int right = 0; right < nums.Length; right++)
        {
            if (nums[right] == 0) zeroCount++;

            while (zeroCount > k)
            {
                if (nums[left] == 0) zeroCount--;
                left++;
            }

            best = Math.Max(best, right - left + 1);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)` — each pointer moves forward at most `n` times.
- **Space:** `O(1)`.
