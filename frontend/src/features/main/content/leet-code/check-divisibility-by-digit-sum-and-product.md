# 3622. Check Divisibility by Digit Sum and Product

**Difficulty:** Easy
**Category:** Math

## Problem

Given a positive integer `n`, return `true` if `n` is divisible by the sum of its digits plus the product of its digits, otherwise return `false`.

### Example

`n = 99`: digit sum = 18, digit product = 81, total = 99. Since `99 % 99 == 0`, the answer is `true`.

## Approach

Walk through the digits of `n` once, accumulating both the running sum and running product, then check whether `n` is divisible by `sum + product`.

## C# Solution

```csharp
public class Solution 
{
    public bool CheckDivisibility(int n) 
    {
        int sum = 0, product = 1;
        int temp = n;
        while (temp > 0) 
        {
            int digit = temp % 10;
            sum += digit;
            product *= digit;
            temp /= 10;
        }
        return n % (sum + product) == 0;
    }
}
```

## Complexity

- **Time:** O(log n)
- **Space:** O(1)
