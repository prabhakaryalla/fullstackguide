# 894. All Possible Full Binary Trees

**Difficulty:** Medium
**Category:** Dynamic Programming, Tree, Recursion, Memoization, Binary Tree

## Problem

A full binary tree is one where every node has either 0 or 2 children. Given an odd integer `n`, return a list of all possible full binary trees with exactly `n` nodes (all node values are `0`), in any order.

### Example

```
Input: n = 7
Output: [[0,0,0,null,null,0,0,null,null,0,0],[0,0,0,null,null,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,null,null,null,null,0,0],[0,0,0,null,null,0,0,0,0]]
```

## Approach

Since a full binary tree always has an odd total node count, and removing the root leaves an even number of remaining nodes split evenly between two odd-sized subtrees, recursively build every possible tree of size `n` by trying every valid odd split `(leftSize, rightSize)` where `leftSize + rightSize = n - 1`. For each split, combine every possible left subtree (recursively built) with every possible right subtree. Memoize results by node count to avoid rebuilding the same subtree shapes repeatedly.

## C# Solution

```csharp
public class Solution
{
    private Dictionary<int, List<TreeNode>> memo = new();

    public IList<TreeNode> AllPossibleFBT(int n)
    {
        return Build(n);
    }

    private List<TreeNode> Build(int n)
    {
        if (memo.TryGetValue(n, out var cached)) return cached;

        var result = new List<TreeNode>();

        if (n == 1)
        {
            result.Add(new TreeNode(0));
        }
        else if (n % 2 == 1)
        {
            for (int leftSize = 1; leftSize < n; leftSize += 2)
            {
                int rightSize = n - 1 - leftSize;

                foreach (var left in Build(leftSize))
                {
                    foreach (var right in Build(rightSize))
                    {
                        var root = new TreeNode(0) { left = left, right = right };
                        result.Add(root);
                    }
                }
            }
        }

        memo[n] = result;
        return result;
    }
}
```

## Complexity

- **Time:** Exponential in `n` (bounded by the Catalan-number growth of tree shapes), but memoized across subproblems.
- **Space:** `O(output size)` for the memoized tree lists.
