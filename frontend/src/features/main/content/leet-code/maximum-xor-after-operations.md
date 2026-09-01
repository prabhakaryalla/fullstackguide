# 2317. Maximum XOR After Operations

**Difficulty:** Medium
**Category:** Array, Bit Manipulation

## Problem

You are given a 0-indexed integer array `nums`. In one operation, select any non-negative integer `x` and an index `i`, then update `nums[i]` to be equal to `nums[i] AND (nums[i] XOR x)`.

Note that `AND` is the bitwise AND operation and `XOR` is the bitwise XOR operation.

Return the maximum possible bitwise XOR of all elements of `nums` after applying the operation any number of times.

### Example

```
Input: nums = [3,2,4,6]
Output: 7
Explanation: The XOR can be maximized to 7 by various operations.
```

## Approach

The key insight is that the operation `nums[i] AND (nums[i] XOR x)` can only turn bits from 1 to 0, never from 0 to 1. Therefore, the maximum XOR is simply the OR of all elements (which gives us all bits that are 1 in at least one element).

## C# Solution

```csharp
public class Solution
{
    public int MaximumXOR(int[] nums)
    {
        int result = 0;
        foreach (int num in nums)
        {
            result |= num;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
