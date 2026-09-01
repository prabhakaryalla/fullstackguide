# 1622. Fancy Sequence

**Difficulty:** Hard
**Category:** Design, Math

## Problem

Design a sequence supporting `Append(val)` (add a value to the end), `AddAll(inc)` (add `inc` to every element), `MultAll(m)` (multiply every element by `m`), and `GetIndex(idx)` (return element `idx` modulo `10^9 + 7`, or `-1` if out of range).

### Example

```
Input: ["Fancy","append","addAll","append","multAll","getIndex","addAll","append","multAll","getIndex","getIndex","getIndex"]
       [[],[2],[3],[7],[2],[0],[3],[10],[2],[0],[1],[2]]
Output: [null,null,null,null,null,10,null,null,null,26,34,20]
```

## Approach

Applying `addAll`/`multAll` to every stored element individually would be too slow, so track two running transform parameters `add` and `mult` representing "every stored raw value `r` currently represents `(r * mult + add) mod M`". `AddAll(inc)` only updates `add`; `MultAll(m)` scales both `add` and `mult`. On `Append(val)`, store the raw value that will reproduce `val` under the *current* transform, i.e. `(val - add) * mult^-1 mod M`, using the modular inverse (`M` is prime, so Fermat's little theorem gives the inverse via fast exponentiation). `GetIndex` simply re-applies the current transform to the stored raw value.

## C# Solution

```csharp
public class Fancy
{
    private const long Mod = 1_000_000_007;
    private readonly List<long> sequence = new List<long>();
    private long add = 0;
    private long mult = 1;

    public void Append(int val)
    {
        long inverseMult = ModPow(mult, Mod - 2, Mod);
        long stored = ((val - add) % Mod + Mod) % Mod * inverseMult % Mod;
        sequence.Add(stored);
    }

    public void AddAll(int inc)
    {
        add = (add + inc) % Mod;
    }

    public void MultAll(int m)
    {
        add = add * m % Mod;
        mult = mult * m % Mod;
    }

    public int GetIndex(int idx)
    {
        if (idx >= sequence.Count)
        {
            return -1;
        }

        long value = (sequence[idx] * mult % Mod + add) % Mod;
        return (int)value;
    }

    private long ModPow(long baseValue, long exponent, long mod)
    {
        long result = 1;
        baseValue %= mod;

        while (exponent > 0)
        {
            if ((exponent & 1) == 1)
            {
                result = result * baseValue % mod;
            }

            baseValue = baseValue * baseValue % mod;
            exponent >>= 1;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(log M)` per `Append` (for the modular inverse), `O(1)` for the other operations.
- **Space:** `O(n)` for the stored sequence.
