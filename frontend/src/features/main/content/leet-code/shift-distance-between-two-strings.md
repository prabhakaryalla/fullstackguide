# 3361. Shift Distance Between Two Strings

**Difficulty:** Medium
**Category:** String, Array, Prefix Sum

## Problem

Given two equal-length strings `s` and `t`, and arrays `nextCost`/`prevCost` (cost to cyclically shift a letter forward/backward by one), find the minimum total cost to transform `s` into `t` by shifting each character independently, choosing forward or backward shifts.

### Example

Input: `s = "abcd"`, `t = "abce"`, costs shifting `'d'` forward to `'e'` costs `nextCost[3]`.
Output: minimum of the forward-path cost and backward-path cost for that single differing letter.

## Approach

For each letter `c` (0-25), precompute the total forward cost to reach every other letter (cumulative sum of `nextCost` walking forward around the cycle) and the total backward cost (cumulative sum of `prevCost` walking backward). For each pair `(s[i], t[i])`, take the minimum of the two precomputed costs.

## C# Solution

```csharp
public class Solution 
{
    public long ShiftDistance(string s, string t, int[] nextCost, int[] prevCost) 
    {
        long[,] fwd = new long[26, 26];
        long[,] bwd = new long[26, 26];

        for (int a = 0; a < 26; a++) 
        {
            long cost = 0;
            int cur = a;
            for (int step = 1; step <= 26; step++) 
            {
                cost += nextCost[cur];
                cur = (cur + 1) % 26;
                fwd[a, cur] = cost;
            }
        }
        for (int a = 0; a < 26; a++) 
        {
            long cost = 0;
            int cur = a;
            for (int step = 1; step <= 26; step++) 
            {
                cost += prevCost[cur];
                cur = (cur - 1 + 26) % 26;
                bwd[a, cur] = cost;
            }
        }

        long total = 0;
        int n = s.Length;
        for (int i = 0; i < n; i++) 
        {
            int a = s[i] - 'a', b = t[i] - 'a';
            total += Math.Min(fwd[a, b], bwd[a, b]);
        }
        return total;
    }
}
```

## Complexity

- **Time:** O(n + 26^2)
- **Space:** O(26^2)
