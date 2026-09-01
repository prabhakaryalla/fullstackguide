# 3540. Minimum Time to Visit All Houses

**Difficulty:** Medium
**Category:** Array, Prefix Sum
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
There are `n` houses arranged in a circle. Moving clockwise from house `i` to house `i+1` (wrapping from house `n-1` to house `0`) costs `forward[i]`; moving counter-clockwise from house `i` to house `i-1` (wrapping from house `0` to house `n-1`) costs `backward[i]`. You start at house `0`. You are given `queries`, a list of house indices that must be visited **in the given order**; for each hop from your current house to the next required house, you may travel either clockwise or counter-clockwise (whichever is cheaper for that specific hop, using direct travel around the circle, not necessarily one step at a time). Return the minimum total time to visit every house in `queries` in order.

### Example
`forward = [1,1,1]`, `backward = [2,2,2]`, `queries = [2]`: starting at house `0`, going clockwise `0→1→2` costs `1+1=2`; going counter-clockwise `0→2` costs `2`. Either way costs `2`. Output: `2`.

## Approach
Precompute prefix sums of `forward` (`prefixF[i]` = total forward cost to go from house `0` up to house `i`) and of `backward` (`prefixB[i]` = total backward cost accumulated up to house `i`), plus the total circle cost using `backward` (`sum`).

For each query target `q`, starting from the current position `pos`:
- The clockwise cost from `pos` to `q` is `prefixF[q] - prefixF[pos]` if `q >= pos`, or `prefixF[n] - prefixF[pos] + prefixF[q]` if the path wraps around (`q < pos`).
- The counter-clockwise cost from `pos` to `q` is `prefixB[pos] - prefixB[q]` if `q <= pos`, or `sum + prefixB[pos] - prefixB[q]` if it wraps around (`q > pos`).
- Add the minimum of the two costs to the running total, then set `pos = q` and continue to the next query.

## C# Solution

```csharp
public class Solution {
    public long MinTotalTime(int[] forward, int[] backward, int[] queries) {
        int n = forward.Length;
        var prefixF = new long[n + 1];
        var prefixB = new long[n + 1];

        for (int i = 0; i < n; i++) {
            prefixF[i + 1] = prefixF[i] + forward[i];
            prefixB[i + 1] = prefixB[i] + backward[i];
        }
        long sum = prefixB[n];

        long ans = 0;
        int pos = 0;
        foreach (int q in queries) {
            long clockwise = q >= pos
                ? prefixF[q] - prefixF[pos]
                : (prefixF[n] - prefixF[pos]) + prefixF[q];
            long counterClockwise = q <= pos
                ? prefixB[pos] - prefixB[q]
                : sum + (prefixB[pos] - prefixB[q]);

            ans += Math.Min(clockwise, counterClockwise);
            pos = q;
        }

        return ans;
    }
}
```

## Complexity

- **Time:** O(n + q) for building prefix sums and answering all queries
- **Space:** O(n) for the prefix sum arrays
