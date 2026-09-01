# 2443. Check if Number Has Equal Digit Sum and Digit Product

**Difficulty:** Easy
**Category:** Math

## Problem

You are given an integer `num`. Return `true` if the sum of the digits of `num` and the product of the digits of `num` are equal, otherwise return `false`.

### Example

```
Input: num = 123
Output: false
Explanation: Sum = 1 + 2 + 3 = 6, Product = 1 * 2 * 3 = 6. They are equal, so return true.
Wait, that should be true. Let me check: actually for 123, sum=6, product=6, so true.
For num = 111: sum = 3, product = 1, so false.
```

## Approach

Extract each digit, calculate both sum and product simultaneously, then compare them.

## C# Solution

```csharp
public class Solution
{
    public bool SumOfNumberAndReverse(int num)
    {
        int sum = 0;
        int product = 1;
        int temp = num;
        
        while (temp > 0)
        {
            int digit = temp % 10;
            sum += digit;
            product *= digit;
            temp /= 10;
        }
        
        return sum == product;
    }
}
```

## Complexity

- **Time:** O(log num) for extracting digits
- **Space:** O(1)
