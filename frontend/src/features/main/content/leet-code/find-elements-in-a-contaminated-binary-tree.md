# 1261. Find Elements in a Contaminated Binary Tree

**Difficulty:** Medium
**Category:** Hash Table, Tree, Depth-First Search, Breadth-First Search, Design, Binary Tree

## Problem

A binary tree originally followed the rule `root.val == 0`, `leftChild.val == 2 * parent.val + 1`, `rightChild.val == 2 * parent.val + 2`, but all node values were overwritten to `-1`. Implement `FindElements(root)` to recover the tree, and support `Find(target)` to check whether a given value exists in the recovered tree.

### Example

```
Input: ["FindElements","find","find"], [[[-1,-1,-1]],[1],[2]]
Output: [null,false,true]
```

## Approach

Recover the tree with a single DFS pass from the root, reassigning `node.val` based on the known rule and simultaneously collecting every recovered value into a `HashSet`. With that set built once during construction, each `Find` query is just a constant-time set lookup.

## C# Solution

```csharp
public class FindElements
{
    private readonly HashSet<int> values = new();

    public FindElements(TreeNode root)
    {
        Recover(root, 0);
    }

    private void Recover(TreeNode node, int val)
    {
        if (node == null) return;

        node.val = val;
        values.Add(val);

        Recover(node.left, 2 * val + 1);
        Recover(node.right, 2 * val + 2);
    }

    public bool Find(int target)
    {
        return values.Contains(target);
    }
}
```

## Complexity

- **Time:** `O(n)` for construction, `O(1)` per `Find` call.
- **Space:** `O(n)` for the recovered value set.
