# 1766. Tree of Coprimes

**Difficulty:** Hard
**Category:** Array, Tree, Depth-First Search, Number Theory

## Problem

Given a tree rooted at node `0` with values `nums[i]` (each between `1` and `50`) and its `edges`, for every node find its closest ancestor whose value is coprime (`gcd == 1`) with its own value. Return an array where `result[i]` is that ancestor's index, or `-1` if none exists.

### Example

```
Input: nums = [2,3,3,2], edges = [[0,1],[1,2],[1,3]]
Output: [-1,0,0,1]
```

## Approach

Since values are bounded by `50`, maintain, for each possible value `1..50`, a stack of `(node, depth)` pairs representing ancestors on the current DFS path with that value. At each node, scan the (at most `50`) distinct values present on the path, skip any not coprime with the current node's value, and take the one whose most recent ancestor has the greatest depth. Push the current node onto its own value's stack before recursing into children, and pop it afterward (standard backtracking-DFS bookkeeping).

## C# Solution

```csharp
public class Solution
{
    public int[] GetCoprimes(int[] nums, int[][] edges)
    {
        int n = nums.Length;
        var adj = new List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int>();
        foreach (var e in edges)
        {
            adj[e[0]].Add(e[1]);
            adj[e[1]].Add(e[0]);
        }

        int[] result = new int[n];
        Array.Fill(result, -1);

        var pathByValue = new List<(int node, int depth)>[51];
        for (int v = 0; v <= 50; v++) pathByValue[v] = new List<(int, int)>();

        void Dfs(int node, int parent, int depth)
        {
            int maxDepth = -1;
            for (int value = 1; value <= 50; value++)
            {
                var list = pathByValue[value];
                if (list.Count == 0 || Gcd(nums[node], value) != 1) continue;

                var (ancestorNode, ancestorDepth) = list[^1];
                if (ancestorDepth > maxDepth)
                {
                    maxDepth = ancestorDepth;
                    result[node] = ancestorNode;
                }
            }

            pathByValue[nums[node]].Add((node, depth));
            foreach (int child in adj[node])
            {
                if (child == parent) continue;
                Dfs(child, node, depth + 1);
            }
            pathByValue[nums[node]].RemoveAt(pathByValue[nums[node]].Count - 1);
        }

        Dfs(0, -1, 0);
        return result;
    }

    private int Gcd(int a, int b) => b == 0 ? a : Gcd(b, a % b);
}
```

## Complexity

- **Time:** `O(50 * n)`.
- **Space:** `O(n + 50)`.
