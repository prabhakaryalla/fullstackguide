# 1581. Customer Who Visited but Did Not Make Any Transactions

**Difficulty:** Easy
**Category:** Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given tables `Visits(visit_id, customer_id)` and `Transactions(transaction_id, visit_id, amount)`, find each customer who visited without making any transaction, and report their total number of such visits.

### Example

```
Input: Visits: (1, 23), (2, 9), Transactions: (2, 5, 310)
Output: (23, 1), (9, 1)
```

## Approach

This is a SQL problem (no C# solution applies). Left join `Visits` to `Transactions` on `visit_id`, keep only rows where no matching transaction exists (`transaction_id IS NULL`), then group by customer and count.

```sql
SELECT v.customer_id, COUNT(*) AS count_no_trans
FROM Visits v
LEFT JOIN Transactions t ON v.visit_id = t.visit_id
WHERE t.transaction_id IS NULL
GROUP BY v.customer_id;
```

## Complexity

- **Time:** `O(n)` — a single left join and group-by pass.
- **Space:** `O(n)` for the grouped result set.
