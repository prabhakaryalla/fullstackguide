# 376. Wiggle Subsequence

**Difficulty:** Medium
**Category:** Array, Greedy, Dynamic Programming

## Problem

A wiggle sequence is one where consecutive differences strictly alternate between positive and negative. Given an integer array `nums`, return the length of the longest wiggle subsequence.

### Example

```
Input: nums = [1,7,4,9,2,5]
Output: 6
```

### Constraints

- `1 <= nums.length <= 1000`
- `0 <= nums[i] <= 1000`

## Approach

Track two rolling lengths: `up`, the longest wiggle subsequence ending with an upward difference, and `down`, ending with a downward difference. Whenever the current element is greater than the previous, `up` becomes `down + 1`; whenever it's smaller, `down` becomes `up + 1`; equal elements don't change either.

## C# Solution

```csharp
public class Solution
{
    public int WiggleMaxLength(int[] nums)
    {
        if (nums.Length < 2) return nums.Length;

        int up = 1, down = 1;
        for (int i = 1; i < nums.Length; i++)
        {
            if (nums[i] > nums[i - 1]) up = down + 1;
            else if (nums[i] < nums[i - 1]) down = up + 1;
        }

        return Math.Max(up, down);
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass.
- **Space:** `O(1)`.
