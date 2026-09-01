# 3550. Smallest Index With Digit Sum Equal to Index

**Difficulty:** Easy
**Category:** Array, Math

## Problem

Given a 0-indexed integer array `nums`, find the smallest index `i` such that the sum of the digits of `nums[i]` is equal to `i`. If no such index exists, return `-1`.

### Example

`nums = [11,10,2,3,4]`. At index `0`, digit sum of `11` is `2 != 0`. At index `1`, digit sum of `10` is `1 == 1`. The answer is `1`.

## Approach

Iterate through the array from index `0` upward, computing the digit sum of `nums[i]` at each step, and return the first index where the digit sum equals the index. If no index satisfies this, return `-1`.

## C# Solution

```csharp
public class Solution 
{
    public int SmallestIndex(int[] nums) 
    {
        for (int i = 0; i < nums.Length; i++)
        {
            if (DigitSum(nums[i]) == i)
            {
                return i;
            }
        }
        return -1;
    }

    private int DigitSum(int num) 
    {
        int sum = 0;
        while (num > 0)
        {
            sum += num % 10;
            num /= 10;
        }
        return sum;
    }
}
```

## Complexity

- **Time:** O(n * d), where `d` is the average number of digits
- **Space:** O(1)
