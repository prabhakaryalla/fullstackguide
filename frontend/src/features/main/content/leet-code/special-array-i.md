# 3151. Special Array I

**Difficulty:** Easy
**Category:** Array

## Problem

An array is "special" if every pair of adjacent elements has different parity (one odd, one even). Given an integer array `nums`, return whether it is special.

### Example

```
Input: nums = [4,3,1,6]
Output: false
Explanation: nums[2] = 1 and nums[3] = 6 have different parities, but nums[1] = 3 and nums[2] = 1 are both odd.
```

## Approach

Scan adjacent pairs; if any two neighbors share the same parity (`nums[i] % 2 == nums[i-1] % 2`), the array isn't special.

## C# Solution

```csharp
public class Solution {
    public bool IsArraySpecial(int[] nums) {
        for (int i = 1; i < nums.Length; i++)
            if (nums[i] % 2 == nums[i - 1] % 2)
                return false;
        return true;
    }
}
```

## Complexity

- Time: O(n) — a single pass over the array.
- Space: O(1).
