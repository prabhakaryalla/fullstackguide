# 487. Max Consecutive Ones II

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Sliding Window
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a binary array `nums`, return the maximum number of consecutive `1`'s if you are allowed to flip at most one `0`.

### Example

```
Input: nums = [1,0,1,1,0]
Output: 4
```

### Constraints

- `1 <= nums.length <= 10^5`
- `nums[i]` is `0` or `1`.

## Approach

Use a sliding window that is allowed to contain at most one `0`. Expand the window by moving the right pointer forward, tracking how many zeros are currently inside; whenever that count exceeds one, shrink from the left until at most one zero remains. The window size at every step is a candidate answer.

## C# Solution

```csharp
public class Solution
{
    public int FindMaxConsecutiveOnes(int[] nums)
    {
        int left = 0, zeroCount = 0, maxLength = 0;

        for (int right = 0; right < nums.Length; right++)
        {
            if (nums[right] == 0) zeroCount++;

            while (zeroCount > 1)
            {
                if (nums[left] == 0) zeroCount--;
                left++;
            }

            maxLength = Math.Max(maxLength, right - left + 1);
        }

        return maxLength;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
