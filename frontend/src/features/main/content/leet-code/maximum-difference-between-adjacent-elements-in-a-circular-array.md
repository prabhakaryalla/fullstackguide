# 3423. Maximum Difference Between Adjacent Elements in a Circular Array

**Difficulty:** Easy
**Category:** Array

## Problem

Given a **circular** array `nums`, return the maximum absolute difference between two **adjacent** elements, where the last element and the first element are also considered adjacent.

### Example

`nums = [1,2,4]`

Adjacent pairs (circular): `(1,2)` diff `1`, `(2,4)` diff `2`, `(4,1)` diff `3`. The maximum is `3`.

## Approach

Iterate over all indices `i`, computing `abs(nums[i] - nums[(i+1) % n])`, and track the maximum. The modulo wraps the last element back to the first, handling the circular adjacency.

## C# Solution

```csharp
public class Solution 
{
    public int MaxAdjacentDistance(int[] nums) 
    {
        int n = nums.Length;
        int maxDiff = 0;
        for (int i = 0; i < n; i++) 
        {
            int diff = Math.Abs(nums[i] - nums[(i + 1) % n]);
            maxDiff = Math.Max(maxDiff, diff);
        }
        return maxDiff;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
