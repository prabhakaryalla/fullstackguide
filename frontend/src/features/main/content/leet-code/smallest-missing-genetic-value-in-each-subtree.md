# 2003. Smallest Missing Genetic Value in Each Subtree

**Difficulty:** Hard
**Category:** Tree, Depth-First Search, Union Find

## Problem

There is a family tree rooted at node `0`, consisting of `n` nodes numbered `0` to `n - 1`. You are given a 0-indexed array `parents`, where `parents[i]` is the parent of node `i`. Because node `0` is the root, `parents[0] == -1`.

Each node has an associated distinct genetic value, given in a 0-indexed array `nums`, where `nums[i]` is the genetic value of node `i`. Values may repeat conceptually across problems, but here each positive integer appears at most once among all `nums[i]`.

For each node `i`, find the smallest genetic value that is **missing** from the subtree rooted at node `i` (i.e. the smallest positive integer not present among `nums[j]` for any `j` in that subtree).

Return an array `ans` of size `n` where `ans[i]` is the answer for node `i`.

## Approach

The key observation is that at most one node holds the genetic value `1`. Every subtree that does **not** contain that node automatically has an answer of `1`, since `1` is missing from it. So the only subtrees that can have an answer greater than `1` are the ancestors of the node holding value `1` (including that node itself).

Algorithm:
1. Build a children list from `parents`.
2. Locate `startNode`, the node with `nums[startNode] == 1`. If it doesn't exist, every answer is `1`.
3. Walk from `startNode` up to the root. At each step, merge in the entire subtree of the current node (skipping the branch we just came from, since it's already merged) into a running `HashSet<int>` of collected values, using an explicit stack to avoid recursion overhead.
4. Maintain a running candidate `cur` starting at `1`; after merging, advance `cur` while it's present in the set. Assign `ans[node] = cur`.
5. Move to the parent and repeat.

Because each node is added to the set exactly once across the entire walk, and `cur` only ever increases, the total work is linear in `n`.

## C# Solution

```csharp
public class Solution
{
    public int[] SmallestMissingValueSubtree(int[] parents, int[] nums)
    {
        int n = parents.Length;
        var children = new List<int>[n];
        for (int i = 0; i < n; i++) children[i] = new List<int>();
        for (int i = 1; i < n; i++) children[parents[i]].Add(i);

        var ans = new int[n];
        Array.Fill(ans, 1);

        int startNode = Array.IndexOf(nums, 1);
        if (startNode == -1) return ans;

        var visited = new bool[n];
        var seen = new HashSet<int>();
        int cur = 1;
        int node = startNode;
        int comingFrom = -1;

        while (node != -1)
        {
            visited[node] = true;
            seen.Add(nums[node]);

            var stack = new Stack<int>();
            foreach (var child in children[node])
                if (child != comingFrom)
                    stack.Push(child);

            while (stack.Count > 0)
            {
                var u = stack.Pop();
                if (visited[u]) continue;
                visited[u] = true;
                seen.Add(nums[u]);
                foreach (var child in children[u])
                    stack.Push(child);
            }

            while (seen.Contains(cur)) cur++;
            ans[node] = cur;

            comingFrom = node;
            node = parents[node];
        }

        return ans;
    }
}
```

## Complexity

- **Time:** `O(n)` amortized — every node is merged into the set exactly once, and `cur` advances at most `n` times overall.
- **Space:** `O(n)` for the children list, visited array, and hash set.
