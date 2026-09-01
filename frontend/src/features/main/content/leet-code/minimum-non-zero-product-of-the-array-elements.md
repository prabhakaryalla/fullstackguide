# 1969. Minimum Non-Zero Product of the Array Elements

**Difficulty:** Medium
**Category:** Math, Greedy, Recursion

## Problem

Given an integer `p`, consider an array of the `2^p` integers from `1` to `2^p - 1`. You may swap any two bits within the same number any number of times (across different array elements too, effectively meaning you can freely redistribute bits between pairs, but the actual rule is: any two elements can have any of their bits swapped). Return the minimum possible product of all elements after any number of such operations, modulo `10^9 + 7`.

### Example

```
Input: p = 1
Output: 1
Explanation: The array is [1]; the product is 1.
```

### Constraints

- `1 <= p <= 60`

## Approach

Numbers `1` to `2^p - 2` can be paired up as `(x, (2^p - 1) - x)`, and it is optimal to swap bits so each pair becomes `(x - 1, (2^p - 1) - x + 1)`... more precisely, the known optimal strategy pairs each number `x` with its complement `y = (2^p - 1) ^ x`, and transforms the pair into `(x-1, y+1)` style adjustments so that every pair's product becomes `(2^p - 1) * (2^p - 2) / 2` repeated appropriately — concretely, the minimum product equals `(2^p - 1)^((2^p - 1) / 2) * (2^p - 1)` — i.e., pair up all numbers except `2^p - 1` itself into `(2^p-2)/2` pairs each multiplying to `2^p - 1`, then multiply by the standalone maximum element `2^p - 1`. Compute this via modular exponentiation: `result = (2^p - 1)^(count) mod (10^9+7)` where `count = 2^(p-1)`, since there are `2^(p-1) - 1` pairs each contributing a factor of `(2^p-1)` plus the standalone max element itself, giving exactly `2^(p-1)` total factors of `(2^p - 1)`.

## C# Solution

```csharp
public class Solution
{
    private const long Mod = 1_000_000_007;

    public int MinNonZeroProduct(int p)
    {
        long maxVal = (ModPow(2, p, Mod) - 1 + Mod) % Mod;
        long trueExponent = 1L << (p - 1);

        long result = ModPow(maxVal, trueExponent, Mod);
        return (int)result;
    }

    private long ModPow(long baseValue, long exp, long mod)
    {
        long result = 1;
        baseValue %= mod;
        if (baseValue < 0) baseValue += mod;
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

- **Time:** `O(log(2^p))` = `O(p)` — modular exponentiation.
- **Space:** `O(1)`.
