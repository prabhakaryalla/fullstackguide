# 3125. Maximum Number That Makes Result of Bitwise AND Zero

**Difficulty:** Easy
**Category:** Bit Manipulation, Math

## Problem

Given a positive integer `n`, find the largest integer `x` such that `1 <= x <= n` and there exists some `y` with `x <= y <= n` where `x & y == 0`. Return `x`.

## Approach

If the highest set bit of `n` is at position `i`, then choosing `x = 2^i - 1` (all `1`s below that bit) guarantees that `y = 2^i` (which is at most `n`, since `n` has a set bit at position `i`) satisfies `x & y == 0` (no overlapping set bits). This `x` is also the largest value achievable, since any larger `x` would need to include bit `i` or higher, leaving no valid `y <= n` disjoint from it. So the answer is simply `2^i - 1`, where `i` is the position of `n`'s highest set bit.

## C# Solution

```csharp
public class Solution {
    public long MaxNumber(long n) {
        int i = 63 - System.Numerics.BitOperations.LeadingZeroCount((ulong)n);
        return (1L << i) - 1;
    }
}
```

## Complexity

- Time: O(1) — computing the highest set bit position is a constant-time operation.
- Space: O(1).
