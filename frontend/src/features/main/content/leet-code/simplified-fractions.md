# 1447. Simplified Fractions

**Difficulty:** Medium
**Category:** Math, String, Number Theory

## Problem

Given an integer `n`, return all simplified fractions `a/b` where `1 <= a < b <= n` and `a` and `b` are coprime.

### Example

```
Input: n = 4
Output: ["1/2","1/3","1/4","2/3","3/4"]
```

## Approach

Enumerate every denominator `b` from `2` to `n` and every numerator `a` from `1` to `b - 1`. A fraction is already in simplest form exactly when `gcd(a, b) == 1`; include only those pairs in the result.

## C# Solution

```csharp
public class Solution
{
    public IList<string> SimplifiedFractions(int n)
    {
        var result = new List<string>();

        for (int b = 2; b <= n; b++)
        {
            for (int a = 1; a < b; a++)
            {
                if (Gcd(a, b) == 1)
                    result.Add($"{a}/{b}");
            }
        }

        return result;
    }

    private int Gcd(int a, int b) => b == 0 ? a : Gcd(b, a % b);
}
```

## Complexity

- **Time:** `O(n^2 log n)` for the pairwise GCD computations.
- **Space:** `O(n^2)` for the result list.
