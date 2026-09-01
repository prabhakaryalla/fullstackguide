# 608. Tree Node

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Tree` table (`id`, `p_id`) representing a tree structure via parent pointers, write a query to report the type of each node: `"Root"` (no parent), `"Leaf"` (no children), or `"Inner"` (has both a parent and at least one child).

### Schema

```
Tree: id (PK), p_id
```

## Approach

A node is the root if its `p_id` is `NULL`. Otherwise, check whether the node's `id` appears as a `p_id` value for any other row — if so, it has children and is an inner node; if not, it's a leaf.

## SQL Solution

```sql
SELECT id,
    CASE
        WHEN p_id IS NULL THEN 'Root'
        WHEN id IN (SELECT DISTINCT p_id FROM Tree WHERE p_id IS NOT NULL) THEN 'Inner'
        ELSE 'Leaf'
    END AS type
FROM Tree;
```

## Complexity

- **Time:** `O(n)` with an index on `p_id`.
- **Space:** `O(n)` for the distinct parent id set.
