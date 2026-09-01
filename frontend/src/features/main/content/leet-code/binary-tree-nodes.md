# 3054. Binary Tree Nodes

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to report the type of each node in a binary tree: `'Root'` if it has no parent, `'Leaf'` if it has a parent but no children, or `'Inner'` if it has both a parent and at least one child.

### Schema

```sql
Create table If Not Exists Tree (N int, P int)
```

`Tree` has one row per node, where `N` is the node's id and `P` is its parent's id (`NULL` for the root).

## Approach

Self-join the table to itself: match each node (`Parent`) against rows where some other node (`Child`) lists it as a parent. If a node has no parent value, it's the root. If it has a parent and also appears as a parent for some child row, it's inner. Otherwise (has a parent, no children), it's a leaf.

## SQL Solution

```sql
SELECT DISTINCT Parent.N,
  CASE
    WHEN Parent.P IS NULL THEN 'Root'
    WHEN Child.P IS NOT NULL THEN 'Inner'
    ELSE 'Leaf'
  END AS type
FROM Tree AS Parent
LEFT JOIN Tree AS Child
  ON Parent.N = Child.P
ORDER BY Parent.N;
```

## Complexity

- Time: O(n^2) worst case for the self-join, where n is the number of nodes.
- Space: O(n) for the output.
