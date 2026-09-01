# 1493. Longest Subarray of 1's After Deleting One Element

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Sliding Window

## Problem

Given a binary array `nums`, you must delete exactly one element. Return the length of the longest subarray of `1`s remaining after that deletion.

### Example

```
Input: nums = [1,1,0,1]
Output: 3
```

## Approach

Use a sliding window that allows at most one `0` inside it. Expand the window to the right, counting zeros encountered; whenever more than one zero appears, shrink from the left until at most one remains. Since exactly one element must always be deleted (even if the window has zero zeros, one `1` still has to be removed), the answer for each window is its length minus one — conveniently, `right - left` already equals that value.

## C# Solution

```csharp
public class Solution
{
    public int LongestSubarray(int[] nums)
    {
        int left = 0, zeros = 0, best = 0;

        for (int right = 0; right < nums.Length; right++)
        {
            if (nums[right] == 0) zeros++;

            while (zeros > 1)
            {
                if (nums[left] == 0) zeros--;
                left++;
            }

            best = Math.Max(best, right - left);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
