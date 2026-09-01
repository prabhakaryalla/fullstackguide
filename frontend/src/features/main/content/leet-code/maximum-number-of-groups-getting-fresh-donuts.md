# 1815. Maximum Number of Groups Getting Fresh Donuts

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bitmask, Memoization

## Problem

A bakery bakes donuts in batches of `batchSize`. `groups[i]` customers arrive together and must all be served from the current batch (they leave happy only if the batch was completely fresh, i.e., the total donuts served so far, including their group, is not "carried over" — precisely, a group is happy if, right before it is served, the number of donuts already handed out is a multiple of `batchSize`). You may reorder the groups arbitrarily. Return the maximum possible number of happy groups.

### Example

```
Input: batchSize = 3, groups = [1,2,3,4,5,6]
Output: 4
```

## Approach

Reduce every group size modulo `batchSize`. Groups with remainder `0` are always happy regardless of order (they exactly finish whatever batch is in progress) — count them immediately. For nonzero remainders, greedily pair up a remainder `r` with a remainder `batchSize - r` whenever both are available; each such pair also always contributes exactly one happy group (the second of the pair) with no leftover effect on the running total, so also count those as happy immediately and remove them. What remains is a small multiset of "unpaired" remainder counts (each `< batchSize`, and the two elements of any complementary pair no longer both exist). Search this residual multiset exhaustively with memoized DFS: the state is the vector of remaining counts per remainder value; from a given "current leftover remainder" try serving each available remainder next, recursing on the reduced counts and updated leftover remainder, and add one bonus happy group whenever the *current* leftover remainder is `0` before serving the next group. Memoize purely on the counts vector (the achievable maximum from a given residual multiset is invariant of how it was reached).

## C# Solution

```csharp
public class Solution
{
    private int _batchSize;
    private readonly Dictionary<string, int> _memo = new();

    public int MaxHappyGroups(int batchSize, int[] groups)
    {
        _batchSize = batchSize;
        var freq = new int[batchSize];
        int happy = 0;

        foreach (int g in groups)
        {
            int r = g % batchSize;
            if (r == 0)
            {
                happy++;
            }
            else if (freq[batchSize - r] > 0)
            {
                freq[batchSize - r]--;
                happy++;
            }
            else
            {
                freq[r]++;
            }
        }

        return happy + Dfs(freq, 0);
    }

    private int Dfs(int[] freq, int remainder)
    {
        string key = string.Join(',', freq);
        if (_memo.TryGetValue(key, out int cached)) return cached;

        int best = 0;
        bool any = false;

        for (int i = 0; i < freq.Length; i++)
        {
            if (freq[i] == 0) continue;
            any = true;
            freq[i]--;
            best = Math.Max(best, Dfs(freq, (remainder + i) % _batchSize));
            freq[i]++;
        }

        if (any && remainder == 0) best++;

        _memo[key] = best;
        return best;
    }
}
```

## Complexity

- **Time:** Exponential in the worst case but bounded tightly by `batchSize <= 9`, giving a small state space of count-vectors that memoization collapses effectively.
- **Space:** `O(states)` for the memo table, where `states` is bounded by the product of possible counts per remainder bucket.
