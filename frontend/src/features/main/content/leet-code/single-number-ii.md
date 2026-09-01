# 137. Single Number II

**Difficulty:** Medium
**Category:** Array, Bit Manipulation

## Problem

Given an integer array `nums`, every element appears exactly three times except for one, which appears exactly once. Find that single element. You must implement a solution with linear runtime complexity and use only constant extra space.

### Example 1

```
Input: nums = [2,2,3,2]
Output: 3
```

### Example 2

```
Input: nums = [0,1,0,1,0,1,99]
Output: 99
```

### Constraints

- `1 <= nums.length <= 3 * 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`

## Approach

Track, for each of the 32 bits, how many numbers have that bit set, using two accumulator variables (`ones`, `twos`) that simulate a base-3 counter per bit: a bit only survives in `ones` if it hasn't yet appeared a multiple of 3 times. After processing all numbers, `ones` holds exactly the bits belonging to the number that appears once.

## C# Solution

```csharp
public class Solution
{
    public int SingleNumber(int[] nums)
    {
        int ones = 0, twos = 0;

        foreach (int num in nums)
        {
            ones = (ones ^ num) & ~twos;
            twos = (twos ^ num) & ~ones;
        }

        return ones;
    }
}
```

## Complexity

- **Time:** `O(n)` — single pass.
- **Space:** `O(1)`.
