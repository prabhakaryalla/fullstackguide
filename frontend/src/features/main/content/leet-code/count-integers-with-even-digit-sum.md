# 2180. Count Integers With Even Digit Sum

**Difficulty:** Easy
**Category:** Math, Simulation

## Problem

Given a positive integer `num`, return the number of positive integers less than or equal to `num` whose digit sum is even.

### Example

```
Input: num = 4
Output: 2
Explanation: 1 (digit sum = 1, odd), 2 (digit sum = 2, even), 3 (digit sum = 3, odd), 4 (digit sum = 4, even)
Count = 2

Input: num = 30
Output: 14
```

## Approach

Iterate through all numbers from 1 to `num` and count how many have an even digit sum.

For each number, calculate the sum of its digits and check if it's even.

## C# Solution

```csharp
public class Solution
{
    public int CountEven(int num)
    {
        int count = 0;
        
        for (int i = 1; i <= num; i++)
        {
            if (GetDigitSum(i) % 2 == 0)
                count++;
        }
        
        return count;
    }
    
    private int GetDigitSum(int n)
    {
        int sum = 0;
        while (n > 0)
        {
            sum += n % 10;
            n /= 10;
        }
        return sum;
    }
}
```

## Complexity

- **Time:** O(n * log n) where n is the input number
- **Space:** O(1)
