# 3800. Minimum Cost to Make Two Binary Strings Equal

**Difficulty:** Medium
**Category:** String, Greedy

## Problem

Given binary strings `s` and `t` of length `n`, and costs `flipCost`, `swapCost`, `crossCost`: you may flip any `s[i]` or `t[i]` (cost `flipCost`), swap `s[i]`/`s[j]` or `t[i]`/`t[j]` (cost `swapCost`), or swap `s[i]`/`t[i]` (cost `crossCost`), any number of times. Return the minimum total cost to make `s == t`.

### Example

Input: `s = "01000", t = "10111", flipCost = 10, swapCost = 2, crossCost = 2`
Output: `16`

## Approach

Only mismatched positions matter. Count `a` = positions with `s='0',t='1'` and `b` = positions with `s='1',t='0'`. Pair opposite-type mismatches first (a same-row swap fixes both) at cost `min(swapCost, 2*flipCost)` each; this uses `p = min(a,b)` pairs. The remaining `r = |a-b|` same-type mismatches must be paired (a cross-then-swap fixes two) at cost `min(crossCost+swapCost, 2*flipCost)` per pair, with one leftover (if `r` is odd) fixed by a single flip.

## C# Solution

```csharp
public class Solution 
{
    public long MinimumCost(string s, string t, int flipCost, int swapCost, int crossCost) 
    {
        long a = 0, b = 0;
        for (int i = 0; i < s.Length; i++)
        {
            if (s[i] == '0' && t[i] == '1') a++;
            else if (s[i] == '1' && t[i] == '0') b++;
        }

        long p = Math.Min(a, b);
        long cost = p * Math.Min(swapCost, 2L * flipCost);
        a -= p;
        b -= p;
        long r = Math.Abs(a - b);

        cost += (r / 2) * Math.Min((long)crossCost + swapCost, 2L * flipCost);
        if (r % 2 == 1) cost += flipCost;
        return cost;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
