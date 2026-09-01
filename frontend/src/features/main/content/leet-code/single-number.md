# 136. Single Number

**Difficulty:** Easy
**Category:** Array, Bit Manipulation

## Problem

Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single element. You must implement a solution with linear runtime complexity and use only constant extra space.

### Example 1

```
Input: nums = [2,2,1]
Output: 1
```

### Example 2

```
Input: nums = [4,1,2,1,2]
Output: 4
```

### Constraints

- `1 <= nums.length <= 3 * 10^4`
- `-3 * 10^4 <= nums[i] <= 3 * 10^4`

## Approach

XOR-ing a number with itself yields `0`, and XOR is commutative and associative, so XOR-ing every element together cancels out every value that appears twice, leaving only the value that appears once.

## C# Solution

```csharp
public class Solution
{
    public int SingleNumber(int[] nums)
    {
        int result = 0;

        foreach (int num in nums)
        {
            result ^= num;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass.
- **Space:** `O(1)`.
