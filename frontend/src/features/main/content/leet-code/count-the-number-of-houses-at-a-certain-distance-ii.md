# 3017. Count the Number of Houses at a Certain Distance II

**Difficulty:** Hard
**Category:** Array, Math, Prefix Sum

## Problem

This is the larger-constraints version of [Count the Number of Houses at a Certain Distance I](count-the-number-of-houses-at-a-certain-distance-i.md): `n` houses stand in a line (`i` connected to `i + 1`), plus one extra road directly connecting house `x` and house `y`. For every `k` from `1` to `n`, return the number of unordered house pairs whose shortest path distance is exactly `k`. `n` can now be large enough that the total pair count overflows a 32-bit integer, so results are returned as 64-bit integers.

## Approach

The algorithm is identical to Part I — split the topology into a ring (`x` to `y`) plus two lines hanging off it, and sum the six geometric contribution scenarios (ring-ring, line-line for each side, line-ring for each side, and line-to-line) using closed-form arithmetic per distance `k`. The only change from Part I is using 64-bit accumulators throughout so the larger counts don't overflow.

## C# Solution

```csharp
public class Solution {
    public long[] CountOfPairs(int n, int x, int y) {
        if (x > y) (x, y) = (y, x);

        int ringLen = y - x + 1;
        int leftLineLen = x - 1;
        int rightLineLen = n - y;

        long[] ans = new long[n];
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

    private void AddInto(long[] target, long[] addend) {
        for (int i = 0; i < target.Length; i++)
            target[i] += addend[i];
    }

    private long[] BothInRing(int n, int ringLen) {
        long[] res = new long[n];
        for (int k = 1; k <= (ringLen - 1) / 2; k++)
            res[k - 1] += ringLen;
        if (ringLen % 2 == 0)
            res[ringLen / 2 - 1] += ringLen / 2;
        return res;
    }

    private long[] BothInSameLine(int n, int lineLen) {
        long[] res = new long[n];
        for (int k = 1; k <= lineLen; k++)
            res[k - 1] += lineLen - k;
        return res;
    }

    private long[] LineToRing(int n, int lineLen, int ringLen) {
        long[] res = new long[n];
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

    private long[] LineToLine(int n, int x, int y, int leftLineLen, int rightLineLen) {
        long[] res = new long[n];
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
