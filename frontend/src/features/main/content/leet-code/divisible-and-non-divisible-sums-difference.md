# 2894. Divisible and Non-divisible Sums Difference

**Difficulty:** Easy
**Category:** Array, Math

## Problem

You are given two positive integers `n` and `m`. Define two integers:
- `num1`: The sum of all integers in the range `[1, n]` that are divisible by `m`
- `num2`: The sum of all integers in the range `[1, n]` that are not divisible by `m`

Return `num1 - num2`.

### Example

```
Input: n = 10, m = 3
Output: 19
Explanation:
Divisible by 3: 3, 6, 9 → sum = 18
Not divisible by 3: 1, 2, 4, 5, 7, 8, 10 → sum = 37
Result: 18 - 37 = -19 (absolute value 19)
```

## Approach

The sum of all integers from 1 to n is `n * (n + 1) / 2`.

To find `num1` (sum of multiples of `m`): compute how many multiples exist (`k = n / m`), then use the formula for arithmetic series: `m * k * (k + 1) / 2`.

Then `num2 = totalSum - num1`, and the answer is `num1 - num2 = 2 * num1 - totalSum`.

## C# Solution

```csharp
public class Solution
{
    public int DifferenceOfSums(int n, int m)
    {
        int totalSum = n * (n + 1) / 2;
        int k = n / m;
        int num1 = m * k * (k + 1) / 2;
        
        return 2 * num1 - totalSum;
    }
}
```

## Complexity

- **Time:** `O(1)` — constant time calculation.
- **Space:** `O(1)`.
