# 3116. Kth Smallest Amount With Single Denomination Combination

**Difficulty:** Hard
**Category:** Array, Math, Binary Search, Bit Manipulation, Combinatorics, Number Theory

## Problem

You are given an array `coins` of distinct coin denominations. Consider every amount that can be formed as an **exact multiple** of a single coin's value (i.e., amounts reachable by repeatedly using just one denomination at a time — the set of all multiples of any single coin). Return the `k`-th smallest such amount overall (counting each amount once even if reachable via multiple coins).

## Approach

Binary search on the answer `m`: check how many distinct valid amounts are `<= m`. Counting amounts divisible by *at least one* coin is a classic application of the Principle of Inclusion-Exclusion (PIE) over subsets of coins: for every non-empty subset of coins, compute the LCM of that subset, and add/subtract `m / lcm` depending on whether the subset size is odd (add) or even (subtract). Precompute, for every subset size, the list of LCMs grouped by size (since there are at most `2^|coins|` subsets, which is small for this problem's constraints), then binary search for the smallest `m` where the inclusion-exclusion count reaches `k`.

## C# Solution

```csharp
public class Solution {
    public long FindKthSmallest(int[] coins, int k) {
        var sizeToLcms = GetSizeToLcms(coins);
        long lo = 0, hi = (long)k * coins.Min();

        while (lo < hi) {
            long mid = (lo + hi) / 2;
            if (NumDenominationsNoGreaterThan(sizeToLcms, mid) >= k)
                hi = mid;
            else
                lo = mid + 1;
        }

        return lo;
    }

    // Returns the count of amounts <= m reachable by at least one coin, via
    // inclusion-exclusion over all non-empty coin subsets.
    private long NumDenominationsNoGreaterThan(List<long>[] sizeToLcms, long m) {
        long res = 0;
        for (int sz = 1; sz < sizeToLcms.Length; sz++)
            foreach (long lcmVal in sizeToLcms[sz])
                res += (m / lcmVal) * (sz % 2 == 1 ? 1 : -1);
        return res;
    }

    private List<long>[] GetSizeToLcms(int[] coins) {
        int n = coins.Length;
        int maxMask = 1 << n;
        var sizeToLcms = new List<long>[n + 1];
        for (int i = 0; i <= n; i++)
            sizeToLcms[i] = new List<long>();

        for (int mask = 1; mask < maxMask; mask++) {
            long lcmOfSelectedCoins = 1;
            int popcount = 0;
            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) != 0) {
                    lcmOfSelectedCoins = Lcm(lcmOfSelectedCoins, coins[i]);
                    popcount++;
                }
            }
            sizeToLcms[popcount].Add(lcmOfSelectedCoins);
        }

        return sizeToLcms;
    }

    private long Gcd(long a, long b) => b == 0 ? a : Gcd(b, a % b);
    private long Lcm(long a, long b) => a / Gcd(a, b) * b;
}
```

## Complexity

- Time: O(2^|coins| * |coins| * log(k * min(coins))) — enumerating all subsets, times the binary search depth.
- Space: O(2^|coins|) — storing the per-subset-size LCM lists.
