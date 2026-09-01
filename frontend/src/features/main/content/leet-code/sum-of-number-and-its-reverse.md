# 2443. Sum of Number and Its Reverse

**Difficulty:** Medium
**Category:** Math, Enumeration

## Problem

Given a non-negative integer `num`, return `true` if `num` can be expressed as the sum of an integer and its reverse. Otherwise, return `false`.

### Example

```
Input: num = 443
Output: true
Explanation: 172 + 271 = 443, and 271 is the reverse of 172.
```

## Approach

Iterate through all possible values from 0 to `num`. For each value `x`, check if `x + reverse(x) == num`. If we find such an `x`, return true. If no such value exists after checking all possibilities, return false.

The search space can be optimized to `num/2 + ε` since if `x > num/2`, then `x + reverse(x) > num` in most cases.

## C# Solution

```csharp
public class Solution
{
    public bool SumOfNumberAndReverse(int num)
    {
        for (int x = 0; x <= num; x++)
        {
            if (x + Reverse(x) == num)
            {
                return true;
            }
        }
        return false;
    }
    
    private int Reverse(int n)
    {
        int result = 0;
        while (n > 0)
        {
            result = result * 10 + (n % 10);
            n /= 10;
        }
        return result;
    }
}
```

## Complexity

- **Time:** O(num * log num) - iterate through num values, each reversal takes O(log num)
- **Space:** O(1)
