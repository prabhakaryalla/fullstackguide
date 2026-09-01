# 3015. Count the Number of Houses at a Certain Distance I

**Difficulty:** Medium
**Category:** Array, Math, Prefix Sum

## Problem

There are `n` houses numbered `1` to `n` standing in a line, connected consecutively (`i` to `i + 1` for every `1 <= i < n`). Additionally, there is a direct road between house `x` and house `y`. Every road has length `1`. For every `k` from `1` to `n`, count the number of unordered pairs of houses whose shortest path distance is exactly `k`, and return the results as an array indexed `0` to `n - 1` (index `k - 1` holds the count for distance `k`).

## Approach

The extra edge between `x` and `y` turns part of the line into a **ring**: houses from `x` to `y` (inclusive) form a cycle of length `ringLen = y - x + 1`, while houses `1..x-1` and `y+1..n` remain simple lines (`leftLineLen` and `rightLineLen`) hanging off the ring. The shortest distance between any two houses depends on which of these three regions they fall into, so the total count for each `k` is the sum of contributions from six scenarios:

1. Both houses inside the ring.
2. Both houses in the left line.
3. Both houses in the right line.
4. One house in the left line, one in the ring.
5. One house in the right line, one in the ring.
6. One house in the left line, one in the right line.

Each scenario has a closed-form contribution per distance `k`, computed with simple arithmetic (no need to run an actual shortest-path search). Summing them and doubling (since pairs are unordered but each contribution is derived per direction) gives the final counts.

## C# Solution

```csharp
public class Solution {
    public int[] CountOfPairs(int n, int x, int y) {
        if (x > y) (x, y) = (y, x);

        int ringLen = y - x + 1;
        int leftLineLen = x - 1;
        int rightLineLen = n - y;

        int[] ans = new int[n];
        AddInto(ans, BothInRing(n, ringLen));
        AddInto(ans, BothInSameLine(n, leftLineLen));
        AddInto(ans, BothInSameLine(n, rightLineLen));
        AddInto(ans, LineToRing(n, leftLineLen, ringLen));
        AddInto(ans, LineToRing(n, rightLineLen, ringLen));
        AddInto(ans, LineToLine(n, x, y, leftLineLen, rightLineLen));

        for (int i = 0; i < n; i++)
            ans[i] *= 2;
        return ans;
    }

    private void AddInto(int[] target, int[] addend) {
        for (int i = 0; i < target.Length; i++)
            target[i] += addend[i];
    }

    private int[] BothInRing(int n, int ringLen) {
        int[] res = new int[n];
        for (int k = 1; k <= (ringLen - 1) / 2; k++)
            res[k - 1] += ringLen;
        if (ringLen % 2 == 0)
            res[ringLen / 2 - 1] += ringLen / 2;
        return res;
    }

    private int[] BothInSameLine(int n, int lineLen) {
        int[] res = new int[n];
        for (int k = 1; k <= lineLen; k++)
            res[k - 1] += lineLen - k;
        return res;
    }

    private int[] LineToRing(int n, int lineLen, int ringLen) {
        int[] res = new int[n];
        for (int k = 1; k <= lineLen + ringLen; k++) {
            int maxInRingLen = Math.Min(k - 1, ringLen / 2);
            int minInRingLen = Math.Max(0, k - lineLen);
            if (minInRingLen <= maxInRingLen) {
                res[k - 1] += (maxInRingLen - minInRingLen + 1) * 2;
                if (minInRingLen == 0)
                    res[k - 1] -= 1;
                if (maxInRingLen * 2 == ringLen)
                    res[k - 1] -= 1;
            }
        }
        return res;
    }

    private int[] LineToLine(int n, int x, int y, int leftLineLen, int rightLineLen) {
        int[] res = new int[n];
        int xLessY = x < y ? 1 : 0;
        for (int k = 1; k <= leftLineLen + rightLineLen + 2; k++) {
            int maxInLeft = Math.Min(leftLineLen, k - 1 - xLessY);
            int minInLeft = Math.Max(1, k - rightLineLen - xLessY);
            if (minInLeft <= maxInLeft)
                res[k - 1] += maxInLeft - minInLeft + 1;
        }
        return res;
    }
}
```

## Complexity

- Time: O(n) — each helper scans a range bounded by `n`.
- Space: O(n) — the result array and intermediate contribution arrays.
