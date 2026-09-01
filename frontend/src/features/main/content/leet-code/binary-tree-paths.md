# 257. Binary Tree Paths

**Difficulty:** Easy
**Category:** Tree, Depth-First Search, String, Backtracking, Binary Tree

## Problem

Given the `root` of a binary tree, return all root-to-leaf paths in any order, formatted as strings of node values joined by `"->"`.

### Example

```
Input: root = [1,2,3,null,5]
Output: ["1->2->5","1->3"]
```

### Constraints

- The number of nodes is in the range `[1, 100]`.

## Approach

Perform a depth-first traversal, building up the path string as nodes are visited. When a leaf node (no children) is reached, the accumulated path is complete and gets added to the result list. Backtracking is implicit here because each recursive call receives its own extended path string rather than mutating a shared one.

## C# Solution

```csharp
public class Solution
{
    public IList<string> BinaryTreePaths(TreeNode root)
    {
        var result = new List<string>();
        if (root != null) Dfs(root, root.val.ToString(), result);
        return result;
    }

    private void Dfs(TreeNode node, string path, List<string> result)
    {
        if (node.left == null && node.right == null)
        {
            result.Add(path);
            return;
        }

        if (node.left != null) Dfs(node.left, path + "->" + node.left.val, result);
        if (node.right != null) Dfs(node.right, path + "->" + node.right.val, result);
    }
}
```

## Complexity

- **Time:** `O(n^2)` worst case — each of the `n` paths can be up to `O(n)` characters long (skewed tree).
- **Space:** `O(n^2)` — for storing all path strings.
