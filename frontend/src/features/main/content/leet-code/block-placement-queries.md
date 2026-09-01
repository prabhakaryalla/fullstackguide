# 3161. Block Placement Queries

**Difficulty:** Hard
**Category:** Array, Binary Indexed Tree, Binary Search, Segment Tree

## Problem
On an infinite number line, you start with obstacles at positions 0 and some large bound. You are given a sequence of queries of two types: type 1 adds an obstacle at a given position `x`; type 2 asks whether it's possible to place a block of length `sz` somewhere in the segment `[0, x]` such that the block doesn't overlap any existing obstacle. Answer each type-2 query (in the order given) as a boolean.

## Approach
Since queries only add obstacles (never remove), process the queries in reverse: start with the final complete set of obstacles, and progressively remove obstacles as we go backwards, which is equivalent to going forward in time but easier to maintain incrementally. Maintain a sorted set of obstacle positions and a Fenwick tree (max variant) storing, for each obstacle, the length of the gap to its right neighbor. When removing an obstacle (going backward in "reverse time"), merge two gaps and update the Fenwick tree with the new maximum available gap ending there. For each type-2 query (processed in reverse), look at the largest obstacle `<= x`, and check either the recorded maximum gap ending at or before that obstacle, or the direct distance `x - prevObstacle`, whichever satisfies `>= sz`. Finally reverse the collected answers to restore original query order.

## C# Solution
```csharp
public class Solution {
    private class FenwickTree {
        private readonly int[] vals;

        public FenwickTree(int n) {
            vals = new int[n + 1];
        }

        public void Maximize(int i, int val) {
            for (; i < vals.Length; i += i & (-i))
                vals[i] = Math.Max(vals[i], val);
        }

        public int Get(int i) {
            int res = 0;
            for (; i > 0; i -= i & (-i))
                res = Math.Max(res, vals[i]);
            return res;
        }
    }

    public IList<bool> GetResults(int[][] queries) {
        int n = Math.Min(50000, queries.Length * 3);
        List<bool> ans = new List<bool>();
        FenwickTree tree = new FenwickTree(n + 1);
        SortedSet<int> obstacles = new SortedSet<int> { 0, n };

        foreach (int[] query in queries)
            if (query[0] == 1)
                obstacles.Add(query[1]);

        int prevVal = -1;
        foreach (int x in obstacles) {
            if (prevVal != -1)
                tree.Maximize(x, x - prevVal);
            prevVal = x;
        }

        List<int> obstacleList = new List<int>(obstacles);

        for (int i = queries.Length - 1; i >= 0; i--) {
            int type = queries[i][0];
            int x = queries[i][1];
            if (type == 1) {
                int idx = obstacleList.BinarySearch(x);
                if (idx < obstacleList.Count - 1)
                    tree.Maximize(obstacleList[idx + 1], obstacleList[idx + 1] - obstacleList[idx - 1]);
                obstacleList.RemoveAt(idx);
            } else {
                int sz = queries[i][2];
                int pos = obstacleList.BinarySearch(x);
                int prevIdx = pos >= 0 ? pos : (~pos) - 1;
                int prev = obstacleList[prevIdx];
                ans.Add(tree.Get(prev) >= sz || x - prev >= sz);
            }
        }

        ans.Reverse();
        return ans;
    }
}
```

## Complexity
- Time: O((n + q) log n)
- Space: O(n + q)
