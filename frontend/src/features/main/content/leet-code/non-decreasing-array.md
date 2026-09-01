# 665. Non-decreasing Array

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

Given an integer array `nums`, return `true` if it can become non-decreasing by modifying at most one element.

### Example

```
Input: nums = [4,2,3]
Output: true
```

### Constraints

- `1 <= nums.length <= 10^4`
- `-10^5 <= nums[i] <= 10^5`

## Approach

Scan for positions where the sequence decreases (`nums[i-1] > nums[i]`); more than one such violation means it's impossible with only one modification. When a violation is found, greedily decide which side to change: if lowering `nums[i-1]` down to `nums[i]` would still keep it `>= nums[i-2]` (or there's no `i-2`), that's the safer fix; otherwise, raise `nums[i]` up to `nums[i-1]` instead.

## C# Solution

```csharp
public class Solution
{
    public bool CheckPossibility(int[] nums)
    {
        int modifications = 0;

        for (int i = 1; i < nums.Length; i++)
        {
            if (nums[i - 1] <= nums[i]) continue;

            modifications++;
            if (modifications > 1) return false;

            if (i < 2 || nums[i - 2] <= nums[i])
                nums[i - 1] = nums[i];
            else
                nums[i] = nums[i - 1];
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
