# 483. Smallest Good Base

**Difficulty:** Hard
**Category:** Math, Binary Search

## Problem

Given a string `n` representing an integer, return the smallest "good base" `k >= 2` such that all digits of `n` in base `k` are `1` — meaning `n` equals `1 + k + k^2 + ... + k^(m-1)` for some `m >= 1`.

### Example

```
Input: n = "13"
Output: "3"
Explanation: 13 in base 3 is 111.
```

### Constraints

- `n` is an integer in the range `[3, 10^18]`.

## Approach

For a good base with `m` digits, `n = 1 + k + k^2 + ... + k^(m-1)`, so `k ≈ n^(1/(m-1))`. Since larger `m` corresponds to a smaller base, and the maximum possible `m` is bounded (base 2 needs at most ~60 digits for `n` up to `10^18`), try every digit count `m` from largest to smallest, estimate the candidate base via an `m-1`-th root, and verify it exactly by summing the geometric series; the first valid base found (from the largest `m` downward) is the smallest possible.

## C# Solution

```csharp
public class Solution
{
    public string SmallestGoodBase(string n)
    {
        long num = long.Parse(n);

        for (int length = 60; length >= 2; length--)
        {
            long base_ = (long)Math.Pow(num, 1.0 / (length - 1));
            if (base_ < 2) continue;

            long sum = 0, current = 1;
            for (int i = 0; i < length; i++)
            {
                sum += current;
                current *= base_;
            }

            if (sum == num) return base_.ToString();
        }

        return (num - 1).ToString();
    }
}
```

## Complexity

- **Time:** `O(log^2 n)`.
- **Space:** `O(1)`.
