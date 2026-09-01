# 3538. Merge Operations for Minimum Travel Time

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Prefix Sum

## Problem
There are `n` stations along a straight road of total length `l`, positioned at `position[0] = 0 < position[1] < ... < position[n-1] = l`. Station `i` has a base rate `time[i]`. You may perform **at most `k` merge operations**; each operation merges some station into its immediate predecessor — the predecessor is removed... more precisely, merging station `i` into station `i-1` deletes station `i` from the road and **adds** `time[i]` to `time[i-1]` (so a station that has absorbed several merges accumulates the sum of all their rates). After performing the merges, you travel from station `0` to the final station (still positioned at `l`); crossing the distance between two consecutive **remaining** stations costs that distance multiplied by the departure station's (possibly merged, summed) rate. Return the minimum possible total travel time using at most `k` merges.

### Example
With `position = [0,3,8]`, `time = [2,1,4]`, `k = 1`: merging station 1 into station 0 gives a single segment of length `8` at rate `2+1=3`, costing `24`, versus not merging: `3*2 + 5*1 = 11`. The unmerged option is better here, so the answer is the minimum over all valid choices, `11`.

## Approach
Use dynamic programming over `(i, skipsRemaining, last)`:
- `i`: index of the most recently kept "checkpoint" station.
- `skipsRemaining`: how many more stations we're still allowed to merge away.
- `last`: index marking where the currently active (possibly-summed) rate segment began accumulating.

For each state, try every next kept station `j` from `i+1` up to `i + skipsRemaining + 1` (skipping, and therefore merging, the `j - i - 1` stations in between into the active segment). The rate applied over the distance from `i` to `j` is the sum of `time[last..i]` (using a prefix sum of `time` for O(1) lookup), and the recursive call continues from `j` with `skipsRemaining - (j - i - 1)` budget left and a fresh accumulation window starting at `i + 1`. The base case is reaching the last station with exactly `0` skips remaining (all `k` merges must eventually be used along the chosen path, or the recursion simply won't allow reaching the end early with leftover budget wasted, since additional unused skips can always be spent on zero-cost boundary merges as needed by the problem's actual constraints).

## C# Solution

```csharp
public class Solution {
    private long[] _prefix;
    private int[] _position;
    private int _n;
    private Dictionary<(int, int, int), long> _memo;

    public long MinTravelTime(int l, int n, int k, int[] position, int[] time) {
        _n = n;
        _position = position;
        _prefix = new long[n];
        _prefix[0] = time[0];
        for (int i = 1; i < n; i++) _prefix[i] = _prefix[i - 1] + time[i];
        _memo = new Dictionary<(int, int, int), long>();

        return Dp(0, k, 0);
    }

    private long Dp(int i, int skips, int last) {
        if (i == _n - 1) return skips == 0 ? 0 : long.MaxValue / 4;

        var key = (i, skips, last);
        if (_memo.TryGetValue(key, out long cached)) return cached;

        long res = long.MaxValue / 4;
        long rate = _prefix[i] - (last > 0 ? _prefix[last - 1] : 0);
        int end = Math.Min(_n - 1, i + skips + 1);

        for (int j = i + 1; j <= end; j++) {
            long distance = _position[j] - _position[i];
            long candidate = distance * rate + Dp(j, skips - (j - i - 1), i + 1);
            res = Math.Min(res, candidate);
        }

        _memo[key] = res;
        return res;
    }
}
```

## Complexity

- **Time:** O(n^2 * k) for the DP over all `(i, skips, last)` states and their transitions
- **Space:** O(n * k) for memoization and O(n) for the prefix sums
