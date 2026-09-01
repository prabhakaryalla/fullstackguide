# 1902. Depth of BST Given Insertion Order

**Difficulty:** Medium
**Category:** Array, Tree, Binary Search Tree, Binary Tree
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an array `order` representing a permutation of `1..n` inserted one at a time into an initially empty binary search tree, return the depth (1-indexed, root has depth 1) of the tree after all elements have been inserted.

### Example

```
Input: order = [2,1,4,3]
Output: 3
Explanation: Insert 2 (depth 1), 1 (depth 2, left of 2), 4 (depth 2, right of 2), 3 (depth 3, left of 4). Max depth is 3.
```

### Constraints

- `n == order.length`
- `1 <= n <= 10^5`
- `order` is a permutation of integers from `1` to `n`.

## Approach

Standard BST insertion for `n` values can be `O(n^2)` in the worst case, which is too slow. Instead, use a sorted structure (a `SortedSet`-like ordered container, simulated here with a sorted list plus binary search or a TreeMap analogue) to find, for each inserted value, its predecessor and successor among the values already inserted — the new node's parent is whichever of those two has already been inserted more recently in terms of tree depth, and its depth is `1 + max(depth of predecessor, depth of successor)` (using 0 for a missing predecessor/successor as if that side has depth 0). Track each inserted value's depth in a dictionary and use a balanced ordered set to query neighbors in `O(log n)`.

## C# Solution

```csharp
public class Solution
{
    public int MaxDepthBST(int[] order)
    {
        var depth = new Dictionary<int, int>();
        var sorted = new SortedSet<int>();
        int maxDepth = 0;

        foreach (int value in order)
        {
            var view = sorted.GetViewBetween(int.MinValue, value - 1);
            int predecessorDepth = 0;
            foreach (var p in view.Reverse()) { predecessorDepth = depth[p]; break; }

            var upperView = sorted.GetViewBetween(value + 1, int.MaxValue);
            int successorDepth = 0;
            foreach (var s in upperView) { successorDepth = depth[s]; break; }

            int d = 1 + Math.Max(predecessorDepth, successorDepth);
            depth[value] = d;
            sorted.Add(value);
            maxDepth = Math.Max(maxDepth, d);
        }

        return maxDepth;
    }
}
```

## Complexity

- **Time:** `O(n log n)` — each insertion performs `O(log n)` ordered-set queries.
- **Space:** `O(n)` for the sorted set and depth dictionary.
