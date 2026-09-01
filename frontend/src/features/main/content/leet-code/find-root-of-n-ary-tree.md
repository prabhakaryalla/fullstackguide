# 1506. Find Root of N-Ary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Breadth-First Search, Bit Manipulation

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given all the nodes of an N-ary tree as a list (in no particular order, where each `Node` has a unique `val` and a list of `children`), find and return the root of the tree.

### Example

```
Input: tree = [1,null,3,2,4,null,5,6]  (level-order N-ary tree representation)
Output: [1,null,3,2,4,null,5,6]
Explanation: The tree is rebuilt and its root (value 1) is returned.
```

## Approach

Every node except the root appears exactly once as someone else's child. So if we sum every node's value and subtract every child's value across the whole list, everything cancels out except the root's value. Once we know the root's value, a second pass finds the matching `Node` instance to return.

## C# Solution

```csharp
public class Solution
{
    public Node FindRoot(List<Node> tree)
    {
        long valueSum = 0;

        foreach (Node node in tree)
        {
            valueSum += node.val;
            foreach (Node child in node.children)
            {
                valueSum -= child.val;
            }
        }

        foreach (Node node in tree)
        {
            if (node.val == valueSum)
            {
                return node;
            }
        }

        return null;
    }
}
```

## Complexity

- **Time:** `O(n)` — two linear passes over the node list (and their children, which together number `n - 1`).
- **Space:** `O(1)` extra space.
