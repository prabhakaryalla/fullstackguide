# 1822. Sign of the Product of an Array

**Difficulty:** Easy
**Category:** Array, Math

## Problem

Given an integer array `nums`, return `1` if the product of all its elements is positive, `-1` if negative, and `0` if the product is zero.

### Example

```
Input: nums = [-1,-2,-3,-4,3,2,1]
Output: 1
```

## Approach

Track a running sign starting at `1`. If any element is `0`, the product is `0`, so return immediately. Otherwise, flip the running sign each time a negative number is encountered; the final sign equals the sign of the product.

## C# Solution

```csharp
public class Solution
{
    public int ArraySign(int[] nums)
    {
        int sign = 1;

        foreach (int num in nums)
        {
            if (num == 0) return 0;
            if (num < 0) sign = -sign;
        }

        return sign;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
