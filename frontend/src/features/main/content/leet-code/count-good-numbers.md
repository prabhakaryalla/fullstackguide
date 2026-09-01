# 1922. Count Good Numbers

**Difficulty:** Medium
**Category:** Math, Recursion

## Problem

A digit string of length `n` is "good" if every digit at an even index (0-indexed) is an even digit (`0, 2, 4, 6, 8`) and every digit at an odd index is a prime digit (`2, 3, 5, 7`). Return the number of good digit strings of length `n`, modulo `10^9 + 7`.

### Example

```
Input: n = 1
Output: 5
Explanation: The good numbers of length 1 are "0", "2", "4", "6", "8" (only one even-indexed position, 5 choices).
```

### Constraints

- `1 <= n <= 10^15`

## Approach

There are `ceil(n / 2)` even indices (5 choices each) and `floor(n / 2)` odd indices (4 choices each). The answer is `5^ceil(n/2) * 4^floor(n/2) mod (10^9 + 7)`, computed efficiently with fast modular exponentiation since `n` can be astronomically large.

## C# Solution

```csharp
public class Solution
{
    private const int Mod = 1_000_000_007;

    public int CountGoodNumbers(long n)
    {
        long evenCount = (n + 1) / 2;
        long oddCount = n / 2;

        long result = ModPow(5, evenCount, Mod) * ModPow(4, oddCount, Mod) % Mod;
        return (int)result;
    }

    private long ModPow(long baseValue, long exp, long mod)
    {
        long result = 1;
        baseValue %= mod;
        while (exp > 0)
        {
            if ((exp & 1) == 1) result = result * baseValue % mod;
            baseValue = baseValue * baseValue % mod;
            exp >>= 1;
        }
        return result;
    }
}
```

## Complexity

- **Time:** `O(log n)` — fast exponentiation for both powers.
- **Space:** `O(1)`.
