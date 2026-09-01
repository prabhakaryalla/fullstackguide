# 3226. Number of Bit Changes to Make Two Integers Equal

**Difficulty:** Easy
**Category:** Bit Manipulation

## Problem
Given two non-negative integers `n` and `k`, you may repeatedly change one bit of `n` from 1 to 0 (you cannot flip 0 to 1). Return the minimum number of such operations needed to make `n` equal to `k`, or -1 if it's impossible.

## Approach
Since you can only clear bits (never set new ones), it's possible to transform `n` into `k` only if `k`'s set bits are a subset of `n`'s set bits (i.e., every bit set in `k` must also be set in `n`), which can be checked via `(n & k) == k`. If this holds, the number of required operations is exactly the number of bits that are set in `n` but not in `k`, computed as the popcount of `n XOR k` (since XOR isolates the differing bits, and those differing bits must all be 1-to-0 clears given the subset condition).

## C# Solution
```csharp
public class Solution {
    public int MinChanges(int n, int k) {
        if ((n & k) != k)
            return -1;
        return System.Numerics.BitOperations.PopCount((uint)(n ^ k));
    }
}
```

## Complexity
- Time: O(1)
- Space: O(1)
