# 3539. Find Sum of Array Product of Magical Sequences

**Difficulty:** Hard
**Category:** Array, Bit Manipulation, Bitmask, Combinatorics, Dynamic Programming, Math

## Problem
You are given integers `m`, `k`, and a 0-indexed array `nums` of length `n`. A sequence `seq` of length `m`, where each `seq[j]` is an index in `[0, n-1]` (indices may repeat), is called **magical** if the integer `2^seq[0] + 2^seq[1] + ... + 2^seq[m-1]` (computed as an ordinary integer sum, with carries) has exactly `k` set bits in its binary representation. The **array product** of `seq` is `nums[seq[0]] * nums[seq[1]] * ... * nums[seq[m-1]]`. Return the sum of the array products over **all** magical sequences, modulo `10^9 + 7`.

### Example
Input: `m = 2`, `k = 2`, `nums = [1,2]` → Sequences `(0,1)` and `(1,0)` give `2^0+2^1=3` (binary `11`, popcount `2`) with product `1*2=2` each; sequence `(1,1)` gives `2^1+2^1=4` (binary `100`, popcount `1`, not magical). Output: `4` (sum of the two qualifying products).

## Approach
Group the choice of sequence by **how many times each index `i` is used**, `count[i]`, with `sum(count[i]) == m`. The multinomial coefficient `C(m, count[0], count[1], ...)` counts how many distinct sequences share the same usage pattern, and the array product for all of them is `nums[i]^count[i]` multiplied together — so the contribution is `multinomial * product(nums[i]^count[i])`.

Process indices `i = 0, 1, ..., n-1` one at a time with a DP over `(remaining length m, remaining required popcount k, current index i, incoming carry from lower bits)`:
- Choosing `count` copies of index `i` contributes `count` to the running bit-sum at "bit position `i`" (before carries), combined with any incoming `carry` from processing index `i-1` gives `total = carry + count`; the resulting bit at this position is `total % 2` (which must match whether this position is expected to be set, tracked by decrementing `k` when it's `1`), and `total / 2` carries forward to index `i + 1`.
- The number of ways to choose `count` occurrences among the `m` total slots (mixed with other indices) is folded into the DP via precomputed binomial coefficients `C(remainingSlots, count)`, and the multiplicative factor `nums[i]^count` is included at each transition.
- The base case (`m == 0`, having processed all indices) succeeds only if the remaining `carry` exactly accounts for the still-required `k` set bits (`popcount(carry) == k`).

## C# Solution

```csharp
public class Solution {
    private const int Mod = 1_000_000_007;
    private int[][] _comb;
    private int[] _nums;
    private Dictionary<(int, int, int, int), long> _memo;

    public int MagicalSum(int m, int k, int[] nums) {
        _nums = nums;
        _comb = GetComb(m);
        _memo = new Dictionary<(int, int, int, int), long>();
        return (int)Dp(m, k, 0, 0);
    }

    private long Dp(int m, int k, int i, int carry) {
        if (m < 0 || k < 0 || m + PopCount(carry) < k) return 0;
        if (m == 0) return k == PopCount(carry) ? 1 : 0;
        if (i == _nums.Length) return 0;

        var key = (m, k, i, carry);
        if (_memo.TryGetValue(key, out long cached)) return cached;

        long res = 0;
        for (int count = 0; count <= m; count++) {
            long contribution = (long)_comb[m][count] * ModPow(_nums[i], count) % Mod;
            int newCarry = carry + count;
            long sub = Dp(m - count, k - (newCarry % 2), i + 1, newCarry / 2);
            res = (res + sub * contribution) % Mod;
        }

        _memo[key] = res;
        return res;
    }

    private int[][] GetComb(int n) {
        var comb = new int[n + 1][];
        for (int i = 0; i <= n; i++) comb[i] = new int[n + 1];
        for (int i = 0; i <= n; i++) comb[i][0] = 1;
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                comb[i][j] = (int)(((long)comb[i - 1][j] + comb[i - 1][j - 1]) % Mod);
        return comb;
    }

    private long ModPow(long x, long n) {
        long result = 1;
        x %= Mod;
        while (n > 0) {
            if ((n & 1) == 1) result = result * x % Mod;
            x = x * x % Mod;
            n >>= 1;
        }
        return result;
    }

    private int PopCount(int x) {
        int count = 0;
        while (x > 0) { count += x & 1; x >>= 1; }
        return count;
    }
}
```

## Complexity

- **Time:** O(m^3 * k * n) for the DP over length, popcount, index, and carry dimensions with an O(m) transition loop
- **Space:** O(m^2 * k * n) for memoization
