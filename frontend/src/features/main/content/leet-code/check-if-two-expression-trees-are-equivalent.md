# 1612. Check If Two Expression Trees are Equivalent

**Difficulty:** Medium
**Category:** Tree, Depth-First Search, Binary Tree

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

An expression tree's leaves hold lowercase variable letters and its internal nodes hold the `+` operator. Two expression trees are "equivalent" if they evaluate to the same result for every possible assignment of the variables. Given the roots of two expression trees, return whether they are equivalent.

### Example

```
Input: root1 = [x], root2 = [x]
Output: true
```

## Approach

Since the only operator is `+`, an expression's value is just the sum of each variable's value multiplied by how many times that variable appears as a leaf. Two such sums are identical for every assignment if and only if every variable occurs the same number of times in both trees. DFS each tree counting leaf occurrences per letter (26 buckets), then compare the two count arrays. `Node` (with a `char val` and `left`/`right` children) is assumed pre-defined.

## C# Solution

```csharp
public class Solution
{
    public bool CheckEquivalence(Node root1, Node root2)
    {
        int[] count1 = new int[26];
        int[] count2 = new int[26];

        CountLeaves(root1, count1);
        CountLeaves(root2, count2);

        for (int i = 0; i < 26; i++)
        {
            if (count1[i] != count2[i])
            {
                return false;
            }
        }

        return true;
    }

    private void CountLeaves(Node node, int[] counts)
    {
        if (node == null)
        {
            return;
        }

        if (node.left == null && node.right == null)
        {
            counts[node.val - 'a']++;
            return;
        }

        CountLeaves(node.left, counts);
        CountLeaves(node.right, counts);
    }
}
```

## Complexity

- **Time:** `O(n)`, visiting every node once across both trees.
- **Space:** `O(1)` beyond the fixed 26-slot count arrays (plus recursion depth).
