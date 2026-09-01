# 1305. All Elements in Two Binary Search Trees

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Search Tree, Sorting, Binary Tree

## Problem

Given the roots of two binary search trees, `root1` and `root2`, return a sorted list containing all the values from both trees.

### Example

```
Input: root1 = [2,1,4], root2 = [1,0,3]
Output: [0,1,1,2,3,4]
```

## Approach

An in-order traversal of a BST produces its values in sorted order. Collect the in-order traversal of each tree into two sorted lists, then merge those two sorted lists the same way merge sort combines two sorted runs.

## C# Solution

```csharp
public class Solution
{
    public IList<int> GetAllElements(TreeNode root1, TreeNode root2)
    {
        var list1 = new List<int>();
        var list2 = new List<int>();
        InOrder(root1, list1);
        InOrder(root2, list2);

        var merged = new List<int>(list1.Count + list2.Count);
        int i = 0, j = 0;

        while (i < list1.Count && j < list2.Count)
        {
            if (list1[i] <= list2[j]) merged.Add(list1[i++]);
            else merged.Add(list2[j++]);
        }

        while (i < list1.Count) merged.Add(list1[i++]);
        while (j < list2.Count) merged.Add(list2[j++]);

        return merged;
    }

    private void InOrder(TreeNode node, List<int> list)
    {
        if (node == null) return;
        InOrder(node.left, list);
        list.Add(node.val);
        InOrder(node.right, list);
    }
}
```

## Complexity

- **Time:** `O(m + n)`.
- **Space:** `O(m + n)` for the traversal lists and result.
