# 2457. Minimum Addition to Make Integer Beautiful

**Difficulty:** Medium
**Category:** Math, Greedy

## Problem

You are given two positive integers `n` and `target`. An integer is beautiful if the sum of its digits is less than or equal to `target`.

Return the minimum non-negative integer `x` such that `n + x` is beautiful. The input is guaranteed to have a solution.

### Example

```
Input: n = 16, target = 6
Output: 4
Explanation: 16 + 4 = 20, digit sum = 2 + 0 = 2 ≤ 6.
```

## Approach

If `n` is already beautiful, return 0. Otherwise, greedily "round up" to the next power of 10 at each digit position. For example, if n = 467 and target = 4, we can add 33 to get 500 (digit sum = 5), or add 533 to get 1000 (digit sum = 1).

The strategy: repeatedly add the amount needed to round the rightmost non-zero digit up to the next multiple of 10^k, until the digit sum becomes ≤ target.

## C# Solution

```csharp
public class Solution
{
    public long MakeIntegerBeautiful(long n, int target)
    {
        long original = n;
        long multiplier = 1;
        
        while (DigitSum(n) > target)
        {
            long rightmost = n % 10;
            if (rightmost > 0)
            {
                n = n / 10 + 1;
            }
            else
            {
                n = n / 10;
            }
            multiplier *= 10;
        }
        
        return n * multiplier - original;
    }
    
    private int DigitSum(long num)
    {
        int sum = 0;
        while (num > 0)
        {
            sum += (int)(num % 10);
            num /= 10;
        }
        return sum;
    }
}
```

## Complexity

- **Time:** O(log n) for the number of digits
- **Space:** O(1)
