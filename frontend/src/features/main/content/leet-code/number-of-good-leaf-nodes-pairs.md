# 1530. Number of Good Leaf Nodes Pairs

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given the root of a binary tree and an integer `distance`, count the number of pairs of leaf nodes such that the shortest path between them (in number of edges) is less than or equal to `distance`.

### Example

```
Input: root = [1,2,3,null,4], distance = 3
Output: 1
```

## Approach

Post-order depth-first search. For each node, gather the list of distances-to-leaf from its left and right subtrees. Any pair combining one distance from the left list and one from the right list whose sum (plus 2, for the two edges connecting to the current node) is `<= distance` forms a good pair; count all such combinations at every node. Return to the parent the list of leaf distances incremented by 1 (bounded and pruned once a distance exceeds `distance`, to keep the recursion efficient).

## C# Solution

```csharp
public class Solution
{
    private int pairCount = 0;
    private int maxDistance;

    public int CountPairs(TreeNode root, int distance)
    {
        maxDistance = distance;
        Dfs(root);
        return pairCount;
    }

    private List<int> Dfs(TreeNode node)
    {
        if (node == null)
        {
            return new List<int>();
        }

        if (node.left == null && node.right == null)
        {
            return new List<int> { 0 };
        }

        List<int> leftDistances = Dfs(node.left);
        List<int> rightDistances = Dfs(node.right);

        foreach (int l in leftDistances)
        {
            foreach (int r in rightDistances)
            {
                if (l + r + 2 <= maxDistance)
                {
                    pairCount++;
                }
            }
        }

        var combined = new List<int>();
        foreach (int l in leftDistances)
        {
            if (l + 1 < maxDistance)
            {
                combined.Add(l + 1);
            }
        }
        foreach (int r in rightDistances)
        {
            if (r + 1 < maxDistance)
            {
                combined.Add(r + 1);
            }
        }

        return combined;
    }
}
```

## Complexity

- **Time:** `O(n * d)` in the worst case, where `d` is bounded by `distance` (at most 10) — the leaf-distance lists per node are small.
- **Space:** `O(n)` for the recursion stack and per-node distance lists.
