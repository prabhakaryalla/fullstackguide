# 1516. Move Sub-Tree of N-Ary Tree

**Difficulty:** Hard
**Category:** Tree, Depth-First Search, Breadth-First Search

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given the root of an N-ary tree and two distinct nodes `p` and `q`, move the subtree rooted at `p` to become a direct child of `q`. Return the root of the resulting tree.

### Example

```
Input: root = [1,null,2,3,null,4,5,null,6,null,7,8], p = 3, q = 8
Output: [1,null,2,3,null,4,null,7,8,null,5,null,6]
```

## Approach

There are two cases to handle:

1. **`q` lies inside the subtree rooted at `p`** (including when `p` is the root, since then everything is inside `p`'s subtree). Find the immediate child of `p` whose own subtree contains `q`, detach it from `p`, and use it to fill `p`'s old slot in its parent's children (or make it the new tree root if `p` was the root). Then attach `p` as a new child of `q`.
2. **Otherwise**, `q` lies outside `p`'s subtree, so simply remove `p` from its current parent's children and append it as a child of `q`. The root is unchanged.

## C# Solution

```csharp
public class Solution
{
    public Node MoveSubTree(Node root, Node p, Node q)
    {
        Node parentOfP = FindParent(root, null, p);
        Node childTowardQ = FindChildContaining(p, q);

        if (childTowardQ != null)
        {
            p.children.Remove(childTowardQ);

            if (parentOfP == null)
            {
                root = childTowardQ;
            }
            else
            {
                int index = parentOfP.children.IndexOf(p);
                parentOfP.children[index] = childTowardQ;
            }
        }
        else
        {
            parentOfP.children.Remove(p);
        }

        q.children.Add(p);
        return root;
    }

    private Node FindParent(Node current, Node parent, Node target)
    {
        if (current == target)
        {
            return parent;
        }

        foreach (Node child in current.children)
        {
            Node found = FindParent(child, current, target);
            if (found != null || child == target)
            {
                return found ?? current;
            }
        }

        return null;
    }

    private Node FindChildContaining(Node p, Node q)
    {
        foreach (Node child in p.children)
        {
            if (Contains(child, q))
            {
                return child;
            }
        }

        return null;
    }

    private bool Contains(Node node, Node target)
    {
        if (node == target)
        {
            return true;
        }

        foreach (Node child in node.children)
        {
            if (Contains(child, target))
            {
                return true;
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n)` — locating `p`'s parent and searching `p`'s subtree for `q` each take a linear scan.
- **Space:** `O(h)` for recursion stack, where `h` is the tree height.
