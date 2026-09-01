# 1104. Path In Zigzag Labelled Binary Tree

**Difficulty:** Medium
**Category:** Math, Tree, Binary Tree

## Problem

In an infinite complete binary tree, nodes are labeled row by row, but rows alternate between left-to-right and right-to-left ordering (a "zigzag" numbering). Given a `label`, return the path of labels from the root to that node.

### Example

```
Input: label = 14
Output: [1,3,4,14]
```

## Approach

Determine the label's row via `floor(log2(label))`. At each step, mirror the current label back to what its position would be if the row were numbered normally (`levelStart + levelEnd - label`), then divide by `2` to move to the parent's *mirrored* position at the row above. Collect labels while walking up to the root, then reverse the collected path.

## C# Solution

```csharp
public class Solution
{
    public IList<int> PathInZigZagTree(int label)
    {
        int level = (int)Math.Log2(label);
        var path = new List<int>();
        int current = label;

        while (current >= 1)
        {
            path.Add(current);
            int levelStart = (int)Math.Pow(2, level);
            int levelEnd = (int)Math.Pow(2, level + 1) - 1;
            current = (levelStart + levelEnd - current) / 2;
            level--;
        }

        path.Reverse();
        return path;
    }
}
```

## Complexity

- **Time:** `O(log label)`.
- **Space:** `O(log label)` for the result path.
