# 2652. Sum Multiples

**Difficulty:** Easy
**Category:** Math, Array

## Problem

Given a positive integer `n`, find the sum of all integers in the range `[1, n]` inclusive that are divisible by 3, 5, or 7.

Return an integer denoting the sum of all numbers in the given range satisfying the constraint.

### Example

```
Input: n = 7
Output: 21
Explanation: Numbers in [1, 7] that are divisible by 3, 5, or 7 are 3, 5, 6, 7. Sum = 3 + 5 + 6 + 7 = 21.

Input: n = 10
Output: 40
Explanation: Numbers in [1, 10] that are divisible by 3, 5, or 7 are 3, 5, 6, 7, 9, 10. Sum = 40.
```

## Approach

Iterate through all numbers from 1 to n and check if each number is divisible by 3, 5, or 7. If so, add it to the running sum.

## C# Solution

```csharp
public class Solution
{
    public int SumOfMultiples(int n)
    {
        int sum = 0;
        for (int i = 1; i <= n; i++)
        {
            if (i % 3 == 0 || i % 5 == 0 || i % 7 == 0)
            {
                sum += i;
            }
        }
        return sum;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
