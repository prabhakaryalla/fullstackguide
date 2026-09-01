# 3145. Find Products of Elements of Big Array

**Difficulty:** Hard
**Category:** Array, Math, Binary Search, Bit Manipulation

## Problem

The "big array" is formed by concatenating, for every positive integer `i` in increasing order, the list of powers of two whose sum equals `i` (i.e., `i`'s binary decomposition), sorted ascending — so it's the infinite sequence `1, 2, 1, 4, 2, 4, 8, ...` derived from writing `1, 2, 3, 4, ...` in binary and listing each one's set-bit powers of two. Given queries `[fromIdx, toIdx, mod]` (1-indexed into the big array), return the product of `big_nums[fromIdx..toIdx]` modulo `mod`, for each query.

## Approach

Since every entry of the big array is a power of two, the product over any range is itself a power of two — specifically `2^(sum of exponents in that range)`. So the problem reduces to computing, for a given count `k`, the sum of exponents of the first `k` entries of the big array, then taking a prefix-difference between the two query bounds and modular-exponentiating `2` to that exponent. Finding "the first `k` entries" requires knowing, for a candidate integer `x`, the cumulative count of set bits across `1..x` (a classic digit-DP-style formula counting how many numbers up to `x` have each bit set) — binary search on `x` to locate exactly where the `k`-th entry falls, then finish summing the appropriate partial exponents from that number's own bits.

## C# Solution

```csharp
public class Solution {
    public int[] FindProductsOfElements(long[][] queries) {
        int[] ans = new int[queries.Length];

        for (int i = 0; i < queries.Length; i++) {
            long a = queries[i][0];
            long b = queries[i][1];
            int mod = (int)queries[i][2];
            long exponent = SumPowersFirstKBigNums(b + 1) - SumPowersFirstKBigNums(a);
            ans[i] = (int)ModPow(2, exponent, mod);
        }

        return ans;
    }

    // Returns the sum of exponents of the first k entries of the big array.
    private long SumPowersFirstKBigNums(long k) {
        if (k == 0)
            return 0;
        long num = FirstNumberHavingSumBitsTillGreaterThan(k);
        long sumPowers = SumPowersTill(num - 1);
        long remainingCount = k - SumBitsTill(num - 1);

        for (int power = 0; power < BitLength(num); power++) {
            if (((num >> power) & 1) == 1) {
                sumPowers += power;
                remainingCount--;
                if (remainingCount == 0)
                    break;
            }
        }
        return sumPowers;
    }

    // Returns the first number x such that sumBitsTill(x) >= k.
    private long FirstNumberHavingSumBitsTillGreaterThan(long k) {
        long lo = 1, hi = k;
        while (lo < hi) {
            long mid = (lo + hi) / 2;
            if (SumBitsTill(mid) < k)
                lo = mid + 1;
            else
                hi = mid;
        }
        return lo;
    }

    // Returns sum(popcount(i)) for 1 <= i <= x.
    private long SumBitsTill(long x) {
        long sumBits = 0;
        for (long powerOfTwo = 1; powerOfTwo <= x; powerOfTwo *= 2) {
            sumBits += (x / (2 * powerOfTwo)) * powerOfTwo;
            sumBits += Math.Max(0, x % (2 * powerOfTwo) + 1 - powerOfTwo);
        }
        return sumBits;
    }

    // Returns the sum of all set-bit exponents across 1 <= i <= x.
    private long SumPowersTill(long x) {
        long sumPowers = 0;
        long powerOfTwo = 1;
        for (int power = 0; power < BitLength(x); power++) {
            sumPowers += (x / (2 * powerOfTwo)) * powerOfTwo * power;
            sumPowers += Math.Max(0, x % (2 * powerOfTwo) + 1 - powerOfTwo) * power;
            powerOfTwo *= 2;
        }
        return sumPowers;
    }

    private long ModPow(long x, long n, int mod) {
        if (n == 0)
            return 1 % mod;
        if (n % 2 == 1)
            return x * ModPow(x % mod, n - 1, mod) % mod;
        return ModPow(x * x % mod, n / 2, mod) % mod;
    }

    private int BitLength(long x) {
        if (x == 0)
            return 0;
        return 64 - System.Numerics.BitOperations.LeadingZeroCount((ulong)x);
    }
}
```

## Complexity

- Time: O(q * log^2(max value)) — each query does a binary search, each step doing O(log) bit-sum work.
- Space: O(q) — for the results array.
