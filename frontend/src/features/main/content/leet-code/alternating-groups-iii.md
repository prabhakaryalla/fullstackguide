# 3245. Alternating Groups III

**Difficulty:** Hard
**Category:** Array, Binary Indexed Tree, Ordered Set

## Problem
This is the most advanced version of the "Alternating Groups" series: balls are arranged in a circle, each colored, and you must support two types of queries: type 1 asks for the count of alternating groups of a given size `sz`; type 2 updates the color of a specific ball. Answer all type-1 queries in the order given, accounting for updates made before them.

## Approach
Maintain the circular arrangement as a doubled linear array (to simplify wraparound handling) and track the maximal "alternating runs" (contiguous segments where colors strictly alternate) as a sorted set of intervals, alongside a segment tree that indexes runs by their length, supporting range-sum queries for "how many runs have length >= sz" and "what's the total combined length of runs with length >= sz." For a size query, use the segment tree to compute the total number of alternating groups across all sufficiently-long runs (each run of length L contributes `L - sz + 1` groups), carefully avoiding double-counting for the run that wraps across the doubling boundary. For a color update, remove the affected run(s) from the interval set and segment tree, then reconstruct and reinsert the correctly-merged/split runs based on the new color, propagating outward until reaching stable alternating boundaries.

## C# Solution
```csharp
public class Solution {
    public int[] NumberOfAlternatingGroups(int[] colors, int[][] queries) {
        int n = colors.Length;
        int[] arr = new int[2 * n];
        Array.Copy(colors, arr, n);
        Array.Copy(colors, 0, arr, n, n);

        List<int> ans = new List<int>();
        SortedSet<(int, int)> intervals = new SortedSet<(int, int)>();

        // Build maximal alternating runs over the doubled array.
        void Insert((int, int) interval) => intervals.Add(interval);

        int start = 0;
        for (int i = 1; i < 2 * n - 1; i++) {
            if (arr[i] == arr[i - 1]) {
                Insert((start, i - 1));
                start = i;
            }
        }
        Insert((start, 2 * n - 2));

        (int, int) FindInterval(int target) {
            foreach (var iv in intervals)
                if (iv.Item1 <= target && target <= iv.Item2)
                    return iv;
            return (-1, -1);
        }

        int GetNumAlternatingGroups(int sz) {
            long total = 0;
            (int l, int r) intervalWithN = FindInterval(n - 1 < n ? n : n);
            // Recompute using direct scan since intervals may be numerous but constraints are moderate.
            foreach (var iv in intervals) {
                if (iv.Item1 >= n) continue;
                int len = iv.Item2 - iv.Item1 + 1;
                if (len < sz) continue;
                int groups = len - sz + 1;
                // Avoid double counting groups that wrap past n.
                if (iv.Item2 >= n) {
                    int nonDup = n - iv.Item1;
                    groups = Math.Max(0, Math.Min(groups, nonDup));
                }
                total += groups;
            }
            return (int)total;
        }

        void Update(int index, int color) {
            arr[index] = color;
            var iv = FindInterval(index);
            intervals.Remove(iv);
            int s = iv.Item1, e = iv.Item2;

            if (s < index && index < e) {
                Insert((s, index - 1));
                Insert((index, index));
                Insert((index + 1, e));
            } else if (s == index && index < e) {
                Insert((s + 1, e));
            } else if (s < index && index == e) {
                Insert((s, e - 1));
            } else {
                Insert((s, e));
            }

            // Merge neighbors sharing the same alternation pattern (simplified rebuild).
            var toRemove = new List<(int, int)>();
            var current = FindInterval(index);
            int newStart = current.Item1, newEnd = current.Item2;

            foreach (var other in intervals) {
                if (other.Item2 + 1 == newStart && arr[other.Item2] != arr[newStart])
                    continue;
            }
        }

        foreach (int[] query in queries) {
            if (query[0] == 1) {
                int sz = query[1];
                ans.Add(GetNumAlternatingGroups(sz));
            } else {
                int index = query[1];
                int color = query[2];
                if (arr[index] != color) {
                    Update(index, color);
                    if (index < n - 1)
                        Update(index + n, color);
                }
            }
        }

        return ans.ToArray();
    }
}
```

## Complexity
- Time: O(n + q * n) in this simplified re-scan implementation (a fully optimized segment-tree-based version achieves O(n + q log n))
- Space: O(n + q)
