# 2096. Step-By-Step Directions From a Binary Tree Node to Another

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

## Problem

Given the `root` of a binary tree with unique values, and two values `startValue` and `destValue`, return the shortest sequence of directions (`'L'`, `'R'`, `'U'` for left, right, and up respectively) needed to travel from the start node to the destination node.

## Approach

Find the path from the root to `startValue` and the path from the root to `destValue`, each expressed as a string of `'L'`/`'R'` moves, via a straightforward depth-first search that records the direction taken at each step and backtracks if a branch doesn't lead to the target.

The two paths share a common prefix down to their lowest common ancestor. Strip that common prefix from both paths. The final answer is: one `'U'` for every remaining character in the start-path suffix (walking up from `startValue` to the LCA), followed by the destination-path suffix unchanged (walking down from the LCA to `destValue`).

## C# Solution

```csharp
public class Solution
{
    public string GetDirections(TreeNode root, int startValue, int destValue)
    {
        var pathToStart = new StringBuilder();
        var pathToDest = new StringBuilder();

        FindPath(root, startValue, pathToStart);
        FindPath(root, destValue, pathToDest);

        string start = pathToStart.ToString();
        string dest = pathToDest.ToString();

        int common = 0;
        while (common < start.Length && common < dest.Length && start[common] == dest[common])
            common++;

        return new string('U', start.Length - common) + dest.Substring(common);
    }

    private bool FindPath(TreeNode node, int target, StringBuilder path)
    {
        if (node == null) return false;
        if (node.val == target) return true;

        path.Append('L');
        if (FindPath(node.left, target, path)) return true;
        path.Length--;

        path.Append('R');
        if (FindPath(node.right, target, path)) return true;
        path.Length--;

        return false;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of nodes.
- **Space:** `O(h)` for recursion depth plus path storage, where `h` is the tree height.
