# 3534. Path Existence Queries in a Graph II

**Difficulty:** Hard
**Category:** Array, Binary Search, Bit Manipulation, Dynamic Programming, Greedy, Sorting

## Problem
You are given `n` nodes with integer values `nums` (0-indexed) and an integer `maxDiff`. An (implicit) edge connects any two nodes `u` and `v` whenever `|nums[u] - nums[v]| <= maxDiff`. Given a list of `queries`, each `[u, v]`, return for every query the **minimum number of edges** on a path from `u` to `v` in this graph, or `-1` if no path exists.

### Example
Input: `nums = [1,2,5,8]`, `maxDiff = 2`, query `[0, 3]` → Node 0 (`1`) connects to node 1 (`2`); node 1 does not connect to node 2 (`5`, diff 3 > 2); no path bridges to node 3. Output: `-1`.

## Approach
Sort the nodes by value; two nodes are directly connected exactly when their values differ by at most `maxDiff`, which (after sorting) corresponds to a **contiguous window** of sorted positions. For each sorted position `i`, precompute `jump[i][0]` = the furthest sorted position reachable in a single hop from `i` (found via a two-pointer sweep, since sorted values only increase).

Build a **binary lifting** table `jump[i][level]` = the position reached from `i` after `2^level` hops of "always jump as far as possible". For each query, map `u` and `v` to their sorted positions, then use the binary lifting table to compute the minimum number of hops needed to reach from the smaller sorted position to the larger one (mirroring the classic "minimum jumps" binary-lifting technique), returning `-1` if the target is unreachable even using the maximum available hop levels.

## C# Solution

```csharp
public class Solution {
    public int[] PathExistenceQueries(int n, int[] nums, int maxDiff, int[][] queries) {
        var sortedNumAndIndexes = new (int val, int origIndex)[n];
        for (int i = 0; i < n; i++) sortedNumAndIndexes[i] = (nums[i], i);
        Array.Sort(sortedNumAndIndexes, (a, b) => a.val != b.val ? a.val.CompareTo(b.val) : a.origIndex.CompareTo(b.origIndex));

        var sortedNums = new int[n];
        var indexMap = new int[n]; // original index -> sorted position
        for (int i = 0; i < n; i++) {
            sortedNums[i] = sortedNumAndIndexes[i].val;
            indexMap[sortedNumAndIndexes[i].origIndex] = i;
        }

        int maxLevel = (int)Math.Floor(Math.Log2(Math.Max(n, 2))) + 2;
        var jump = new int[n, maxLevel];

        int right = 0;
        for (int i = 0; i < n; i++) {
            if (right < i) right = i;
            while (right + 1 < n && sortedNums[right + 1] - sortedNums[i] <= maxDiff) right++;
            jump[i, 0] = right;
        }

        for (int level = 1; level < maxLevel; level++)
            for (int i = 0; i < n; i++)
                jump[i, level] = jump[jump[i, level - 1], level - 1];

        var ans = new int[queries.Length];
        for (int q = 0; q < queries.Length; q++) {
            int u = queries[q][0], v = queries[q][1];
            int uIndex = indexMap[u], vIndex = indexMap[v];
            int start = Math.Min(uIndex, vIndex);
            int end = Math.Max(uIndex, vIndex);
            int res = MinJumps(jump, start, end, maxLevel - 1);
            ans[q] = res == int.MaxValue ? -1 : res;
        }

        return ans;
    }

    private int MinJumps(int[,] jump, int start, int end, int level) {
        if (start == end) return 0;
        if (jump[start, 0] >= end) return 1;
        if (jump[start, level] < end && level == 0) return int.MaxValue;
        if (jump[start, level] < end) return MinJumps(jump, start, end, level - 1);

        int j = level;
        while (j >= 0 && jump[start, j] >= end) j--;
        if (j < 0) return 1;
        int hops = 1 << j;
        int nextStart = jump[start, j];
        int rest = MinJumps(jump, nextStart, end, j);
        return rest == int.MaxValue ? int.MaxValue : hops + rest;
    }
}
```

## Complexity

- **Time:** O(n log n) preprocessing plus O(q log n) for answering all queries via binary lifting
- **Space:** O(n log n) for the binary lifting table
