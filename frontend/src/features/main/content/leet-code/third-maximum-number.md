# 414. Third Maximum Number

**Difficulty:** Easy
**Category:** Array, Sorting

## Problem

Given an integer array `nums`, return the third distinct maximum number in this array. If the third maximum does not exist, return the maximum number.

### Example

```
Input: nums = [3,2,1]
Output: 1
```

### Constraints

- `1 <= nums.length <= 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`

## Approach

Track the top three distinct values seen so far (`first`, `second`, `third`) using sentinels smaller than any possible input. For each number, skip it if it duplicates one of the top three; otherwise, insert it into the correct rank and shift the smaller ones down.

## C# Solution

```csharp
public class Solution
{
    public int ThirdMax(int[] nums)
    {
        long first = long.MinValue, second = long.MinValue, third = long.MinValue;

        foreach (var num in nums)
        {
            if (num == first || num == second || num == third) continue;

            if (num > first)
            {
                third = second;
                second = first;
                first = num;
            }
            else if (num > second)
            {
                third = second;
                second = num;
            }
            else if (num > third)
            {
                third = num;
            }
        }

        return third == long.MinValue ? (int)first : (int)third;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
