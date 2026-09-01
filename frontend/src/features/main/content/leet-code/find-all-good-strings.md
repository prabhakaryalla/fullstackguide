# 1397. Find All Good Strings

**Difficulty:** Hard
**Category:** String, Dynamic Programming, String Matching

## Problem

Given `n`, `s1`, `s2` (both length `n`), and a string `evil`, return the number of strings of length `n`, lexicographically between `s1` and `s2` inclusive, that do **not** contain `evil` as a substring, modulo `10^9 + 7`.

### Example

```
Input: n = 2, s1 = "aa", s2 = "da", evil = "b"
Output: 51
```

## Approach

Build a KMP-style automaton for `evil` so that appending any character to a partial match transitions to the correct next matched-prefix length in O(1). Then run a digit-DP over string positions, tracking the automaton state and whether the string built so far is still tied to the lower bound `s1` and/or upper bound `s2`. Reaching a state where the automaton fully matches `evil` contributes `0`; reaching the end of the string without ever fully matching contributes `1`. Memoize the fully "free" (untied) subproblems, since they don't depend on which bound path was taken.

## C# Solution

```csharp
public class Solution
{
    private int n, m;
    private int[,] trans;
    private long[,] memo;
    private string s1, s2;
    private const int MOD = 1_000_000_007;

    public int FindGoodStrings(int n, string s1, string s2, string evil)
    {
        this.n = n;
        this.s1 = s1;
        this.s2 = s2;
        this.m = evil.Length;
        BuildAutomaton(evil);

        memo = new long[n, m];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++)
                memo[i, j] = -1;

        return (int)Dfs(0, 0, true, true);
    }

    private void BuildAutomaton(string evil)
    {
        trans = new int[m, 26];
        var fail = new int[m];

        for (int i = 1, k = 0; i < m; i++)
        {
            while (k > 0 && evil[i] != evil[k]) k = fail[k - 1];
            if (evil[i] == evil[k]) k++;
            fail[i] = k;
        }

        for (int state = 0; state < m; state++)
        {
            for (int c = 0; c < 26; c++)
            {
                char ch = (char)('a' + c);
                int k = state;
                while (k > 0 && ch != evil[k]) k = fail[k - 1];
                if (ch == evil[k]) k++;
                trans[state, c] = k;
            }
        }
    }

    private long Dfs(int pos, int state, bool tightLow, bool tightHigh)
    {
        if (state == m) return 0;
        if (pos == n) return 1;
        if (!tightLow && !tightHigh && memo[pos, state] != -1) return memo[pos, state];

        char lo = tightLow ? s1[pos] : 'a';
        char hi = tightHigh ? s2[pos] : 'z';

        long total = 0;
        for (char c = lo; c <= hi; c++)
        {
            int nextState = trans[state, c - 'a'];
            if (nextState == m) continue;
            total += Dfs(pos + 1, nextState, tightLow && c == lo, tightHigh && c == hi);
        }
        total %= MOD;

        if (!tightLow && !tightHigh) memo[pos, state] = total;
        return total;
    }
}
```

## Complexity

- **Time:** `O(n * m * 26)`.
- **Space:** `O(n * m)` for the memo table and automaton.
