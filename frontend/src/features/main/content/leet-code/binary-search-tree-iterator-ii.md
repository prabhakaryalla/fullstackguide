# 1586. Binary Search Tree Iterator II

**Difficulty:** Medium
**Category:** Design, Binary Search Tree, Binary Tree, Iterator

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Implement an iterator over a binary search tree that supports `Next()` (return the next smallest number), `HasNext()`, `Prev()` (return the previous number), `HasPrev()`, and random-access `Next()`/`Prev()` calls that can move both forward and backward across calls.

### Example

```
Input: BSTIterator2(root), then calls to Next(), HasNext(), Prev(), HasPrev()
Output: values returned in in-order sequence, forward or backward
```

## Approach

Since bidirectional navigation is required, the simplest robust approach is to perform a full in-order traversal upfront to materialize the sorted list of values, then track a single integer cursor pointing to the current position within that list. `Next()` advances the cursor and returns the corresponding value; `Prev()` moves it back. `HasNext()`/`HasPrev()` simply check the cursor's bounds.

## C# Solution

```csharp
public class BSTIterator
{
    private readonly List<int> values = new List<int>();
    private int cursor = -1;

    public BSTIterator(TreeNode root)
    {
        InOrder(root);
    }

    private void InOrder(TreeNode node)
    {
        if (node == null)
        {
            return;
        }
        InOrder(node.left);
        values.Add(node.val);
        InOrder(node.right);
    }

    public bool HasNext() => cursor + 1 < values.Count;

    public int Next() => values[++cursor];

    public bool HasPrev() => cursor > 0;

    public int Prev() => values[--cursor];
}
```

## Complexity

- **Time:** `O(n)` to build the sorted list once; each `Next()`/`Prev()`/`HasNext()`/`HasPrev()` call is `O(1)`.
- **Space:** `O(n)` for the materialized in-order value list.
