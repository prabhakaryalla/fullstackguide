# 3533. Concatenated Divisibility

**Difficulty:** Hard
**Category:** Array, Bit Manipulation, Bitmask, Dynamic Programming

## Problem
You are given an array of positive integers `nums` and an integer `k`. Arrange **all** elements of `nums` into some order and concatenate their decimal string representations to form one large number. Among all orderings that make this large number divisible by `k`, return the ordering (as an array of the original numbers) that produces the **lexicographically smallest** concatenated result. If no such ordering exists, return an empty array.

### Example
Input: `nums = [3,12]`, `k = 4` → Possible concatenations: `"312"` (312 % 4 = 0) and `"123"` (123 % 4 = 3). Only `"312"` works. Output: `[3,12]`.

## Approach
Sort `nums` first so that when multiple valid completions exist, trying candidates in sorted order naturally produces the lexicographically smallest concatenation.

Use a **bitmask dynamic program**: `dp[mask][mod]` = true if, having already placed the elements indicated by `mask` (in some valid relative order) leaving a running remainder `mod`, it is possible to place the remaining elements so the final concatenation is divisible by `k`.
- Precompute for each number its string length and `10^length % k`, so that appending number `i` to a running remainder `mod` yields the new remainder `(mod * pow10[i] + nums[i] % k) % k`.
- Base case: `mask` is full (all elements placed) → valid iff `mod == 0`.
- Recurrence: `dp[mask][mod]` is true if there exists an unused index `i` such that `dp[mask | (1<<i)][(mod * pow10[i] + nums[i]) % k]` is true.
- To build the lexicographically smallest answer, reconstruct greedily: at each step, try unused indices in **sorted** order and pick the first one for which the remaining placement is still feasible.

## C# Solution

```csharp
public class Solution {
    private int[] _pows;
    private int _k;
    private int[] _nums;
    private int[,] _memo; // -1 unknown, 0 false, 1 true

    public int[] ConcatenatedDivisibility(int[] nums, int k) {
        Array.Sort(nums);
        _nums = nums;
        _k = k;
        int n = nums.Length;
        _pows = new int[n];
        for (int i = 0; i < n; i++) {
            int len = nums[i].ToString().Length;
            long p = 1;
            for (int j = 0; j < len; j++) p = (p * 10) % k;
            _pows[i] = (int)p;
        }

        _memo = new int[1 << n, k];
        for (int i = 0; i < (1 << n); i++)
            for (int j = 0; j < k; j++)
                _memo[i, j] = -1;

        if (!Dp(0, 0)) return Array.Empty<int>();
        return Reconstruct(0, 0).ToArray();
    }

    private bool Dp(int mask, int mod) {
        if (_memo[mask, mod] != -1) return _memo[mask, mod] == 1;
        int full = (1 << _nums.Length) - 1;
        if (mask == full) {
            bool res = mod == 0;
            _memo[mask, mod] = res ? 1 : 0;
            return res;
        }
        for (int i = 0; i < _nums.Length; i++) {
            if ((mask >> i & 1) == 1) continue;
            int newMod = (int)(((long)mod * _pows[i] + _nums[i] % _k) % _k);
            if (Dp(mask | (1 << i), newMod)) {
                _memo[mask, mod] = 1;
                return true;
            }
        }
        _memo[mask, mod] = 0;
        return false;
    }

    private List<int> Reconstruct(int mask, int mod) {
        for (int i = 0; i < _nums.Length; i++) {
            if ((mask >> i & 1) == 1) continue;
            int newMod = (int)(((long)mod * _pows[i] + _nums[i] % _k) % _k);
            if (Dp(mask | (1 << i), newMod)) {
                var res = new List<int> { _nums[i] };
                res.AddRange(Reconstruct(mask | (1 << i), newMod));
                return res;
            }
        }
        return new List<int>();
    }
}
```

## Complexity

- **Time:** O(2^n * k * n) for the bitmask DP over all masks, remainders, and transition choices
- **Space:** O(2^n * k) for the memoization table
