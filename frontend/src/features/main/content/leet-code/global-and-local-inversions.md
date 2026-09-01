# 775. Global and Local Inversions

**Difficulty:** Medium
**Category:** Array, Math

## Problem

Given a permutation `nums` of `0` to `n-1`, a global inversion is any pair `i < j` with `nums[i] > nums[j]`, and a local inversion is a global inversion where `j == i + 1`. Return `true` if the number of global inversions equals the number of local inversions.

### Example

```
Input: nums = [1,0,2]
Output: true
```

## Approach

The counts are equal exactly when every inversion is "local" — no element is displaced by more than one position from any element more than one index away. Equivalently, scanning left to right, if the maximum value seen among indices `0..i` ever exceeds `nums[i+2]`, there must be some non-adjacent inversion, so the answer is `false`. Track the running maximum and compare it against the element two positions ahead at every step.

## C# Solution

```csharp
public class Solution
{
    public bool IsIdealPermutation(int[] nums)
    {
        int maxSoFar = -1;

        for (int i = 0; i < nums.Length - 2; i++)
        {
            maxSoFar = Math.Max(maxSoFar, nums[i]);
            if (maxSoFar > nums[i + 2]) return false;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra.
