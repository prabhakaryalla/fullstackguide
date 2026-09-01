# 1522. Diameter of N-Ary Tree

**Difficulty:** Medium
**Category:** Tree, Depth-First Search

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the root of an N-ary tree, return the length (in number of edges) of the diameter of the tree — the length of the longest path between any two nodes.

### Example

```
Input: root = [1,null,3,2,4,null,5,6]
Output: 3
```

## Approach

Run a post-order depth-first search. For each node, compute the height of each child subtree (height = edges from this node down to its deepest descendant). The best path through this node is the sum of its two largest child heights; track the maximum of these sums across all nodes as the diameter, while returning `1 + max child height` to the parent call.

## C# Solution

```csharp
public class Solution
{
    private int diameter = 0;

    public int Diameter(Node root)
    {
        Height(root);
        return diameter;
    }

    private int Height(Node node)
    {
        if (node == null || node.children == null || node.children.Count == 0)
        {
            return 0;
        }

        int first = 0;
        int second = 0;

        foreach (Node child in node.children)
        {
            int h = Height(child) + 1;
            if (h > first)
            {
                second = first;
                first = h;
            }
            else if (h > second)
            {
                second = h;
            }
        }

        diameter = Math.Max(diameter, first + second);
        return first;
    }
}
```

## Complexity

- **Time:** `O(n)` — every node is visited once.
- **Space:** `O(h)` for the recursion stack, where `h` is the tree height.
