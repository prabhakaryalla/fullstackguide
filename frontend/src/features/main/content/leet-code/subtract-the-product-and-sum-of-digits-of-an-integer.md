# 1281. Subtract the Product and Sum of Digits of an Integer

**Difficulty:** Easy
**Category:** Math

## Problem

Given an integer `n`, return the difference between the product of its digits and the sum of its digits.

### Example

```
Input: n = 234
Output: 15
Explanation: Product = 2*3*4 = 24, Sum = 2+3+4 = 9, 24 - 9 = 15.
```

## Approach

Repeatedly extract the last digit with `n % 10`, accumulate it into a running product and a running sum, then strip it off with integer division `n / 10`. Once every digit has been processed, subtract the sum from the product.

## C# Solution

```csharp
public class Solution
{
    public int SubtractProductAndSum(int n)
    {
        int product = 1, sum = 0;

        while (n > 0)
        {
            int digit = n % 10;
            product *= digit;
            sum += digit;
            n /= 10;
        }

        return product - sum;
    }
}
```

## Complexity

- **Time:** `O(log(n))`.
- **Space:** `O(1)`.
