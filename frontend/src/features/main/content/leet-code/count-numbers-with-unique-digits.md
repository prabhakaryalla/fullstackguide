# 357. Count Numbers with Unique Digits

**Difficulty:** Medium
**Category:** Math, Dynamic Programming, Backtracking

## Problem

Given an integer `n`, return the count of all numbers with unique digits `x` where `0 <= x < 10^n`.

### Example

```
Input: n = 2
Output: 91
Explanation: The answer should be all numbers in [0,99] except [11,22,33,44,55,66,77,88,99].
```

### Constraints

- `0 <= n <= 8`

## Approach

Count numbers digit-length by digit-length using a combinatorial formula: for length `k` (`k >= 1`), the first digit has 9 choices (non-zero), and each subsequent digit has one fewer available choice than the previous one (since digits must stay unique). Accumulate this count for each length from `1` up to `n`, starting from the base case of `1` (for the number `0`).

## C# Solution

```csharp
public class Solution
{
    public int CountNumbersWithUniqueDigits(int n)
    {
        if (n == 0) return 1;

        int result = 10;
        int uniqueDigits = 9;
        int availableDigits = 9;

        for (int i = 2; i <= n && availableDigits > 0; i++)
        {
            uniqueDigits *= availableDigits;
            result += uniqueDigits;
            availableDigits--;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
