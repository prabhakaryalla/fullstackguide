# 2160. Minimum Sum of Four Digit Number After Splitting Digits

**Difficulty:** Easy
**Category:** Math, Greedy, Sorting

## Problem

You are given a positive integer `num` consisting of exactly four digits. Split `num` into two new integers `new1` and `new2` by using the digits of `num`. Leading zeros are allowed in `new1` and `new2`.

Return the minimum possible sum of `new1` and `new2`.

### Example

```
Input: num = 2932
Output: 52
Explanation: Split as 29 and 23, sum = 52.
Better: split as 2 and 39, sum = 41.
Best: split as 23 and 29, or rearrange to get 29 and 23 -> actually 2+93=95, no...
Actually: 2,2,3,9 -> make 29 and 23, sum = 52.
Wait, sorted: 2,2,3,9 -> make 23 and 29 = 52 OR make 2 and 329 = 331, no...
Best is: 22 and 39? No wait.
Sorted: 2,2,3,9
To minimize sum: put smallest in tens, next smallest in tens of other number
Make: 2_ and 2_ then put 3 and 9 -> 23 and 29 = 52
Or: 2 and 2_9 = 2 + 239... no
Actually best: 29 and 23 = 52, or 22 and 39 = 61
So 29+23 = 52 is correct.
Wait, smallest sum: we want balanced numbers, smallest digits in highest places:
2,2,3,9 -> 22, 39 = 61 OR 23, 29 = 52 OR 29, 32 = 61
Pattern: alternate smallest digits: 2,3 and 2,9 -> 23 + 29 = 52
```

## Approach

Sort the 4 digits in ascending order. To minimize the sum, we want to create two numbers where the smallest digits are in the tens places:
- First number: digit[0] * 10 + digit[2]
- Second number: digit[1] * 10 + digit[3]

This ensures both numbers are as small as possible.

## C# Solution

```csharp
public class Solution
{
    public int MinimumSum(int num)
    {
        var digits = new int[4];
        
        for (int i = 0; i < 4; i++)
        {
            digits[i] = num % 10;
            num /= 10;
        }
        
        Array.Sort(digits);
        
        int new1 = digits[0] * 10 + digits[2];
        int new2 = digits[1] * 10 + digits[3];
        
        return new1 + new2;
    }
}
```

## Complexity

- **Time:** O(1) since we always have exactly 4 digits
- **Space:** O(1)
