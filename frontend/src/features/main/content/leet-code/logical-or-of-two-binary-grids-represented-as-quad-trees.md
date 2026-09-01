# 558. Logical OR of Two Binary Grids Represented as Quad-Trees

**Difficulty:** Medium
**Category:** Bit Manipulation, Tree, Depth-First Search, Quadtree

## Problem

Given two quad-trees `quadTree1` and `quadTree2` each representing an `n x n` binary grid, return a quad-tree representing the logical OR (element-wise) of the two grids.

### Example

```
Input: quadTree1 = [[0,1],[1,1],[1,1],[1,0],[1,0]], quadTree2 = [[0,1],[1,1],[0,1],[1,1],[1,0],[1,0],[1,1]]
Output: [[0,0],[1,1],[1,1],[1,1],[1,0],[1,0],[1,0],[1,1],[1,1]]
```

## Approach

Recursively combine the two quad-trees. If either node is a leaf with value `true`, the OR result for that entire region is `true` (a leaf equal to whichever tree was `true`), since OR-ing anything with `true` yields `true`. If either is a leaf with value `false`, the result is simply the other tree's subtree for that region. Otherwise, recursively combine all four corresponding quadrants, and merge them back into a single leaf if all four children turn out to be identical leaves.

## C# Solution

```csharp
public class Solution
{
    public Node Intersect(Node quadTree1, Node quadTree2)
    {
        if (quadTree1.isLeaf) return quadTree1.val ? quadTree1 : quadTree2;
        if (quadTree2.isLeaf) return quadTree2.val ? quadTree2 : quadTree1;

        var topLeft = Intersect(quadTree1.topLeft, quadTree2.topLeft);
        var topRight = Intersect(quadTree1.topRight, quadTree2.topRight);
        var bottomLeft = Intersect(quadTree1.bottomLeft, quadTree2.bottomLeft);
        var bottomRight = Intersect(quadTree1.bottomRight, quadTree2.bottomRight);

        if (topLeft.isLeaf && topRight.isLeaf && bottomLeft.isLeaf && bottomRight.isLeaf
            && topLeft.val == topRight.val && topRight.val == bottomLeft.val && bottomLeft.val == bottomRight.val)
        {
            return new Node(topLeft.val, true);
        }

        return new Node(true, false, topLeft, topRight, bottomLeft, bottomRight);
    }
}
```

## Complexity

- **Time:** `O(n^2)` in the worst case, proportional to the total number of leaf nodes across both trees.
- **Space:** `O(log n)` for the recursion stack.
