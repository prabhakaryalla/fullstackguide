# 1907. Count Salary Categories

**Difficulty:** Medium
**Category:** Database

## Problem

`Table: Accounts(account_id, income)`. Categorize each account by its `income` into `"Low Salary"` (`income < 20000`), `"Average Salary"` (`20000 <= income <= 50000`), or `"High Salary"` (`income > 50000`), and report the number of accounts in each category, including categories with a count of `0`.

### Example

```
Input:
Accounts: (3, 108939), (2, 12747), (8, 87709), (6, 91796)
Output:
("Low Salary", 1), ("Average Salary", 0), ("High Salary", 3)
```

## Approach

Build a fixed three-row category table (via a derived table of the three category names), then left join an aggregated count of `Accounts` grouped by a `CASE` expression that buckets each account's income into one of the three categories. Using a left join from the categories to the grouped counts guarantees categories with zero matches still appear with `count = 0`.

```sql
SELECT c.category, COUNT(a.account_id) AS accounts_count
FROM (SELECT 'Low Salary' AS category
      UNION ALL SELECT 'Average Salary'
      UNION ALL SELECT 'High Salary') c
LEFT JOIN Accounts a
  ON (c.category = 'Low Salary' AND a.income < 20000)
  OR (c.category = 'Average Salary' AND a.income BETWEEN 20000 AND 50000)
  OR (c.category = 'High Salary' AND a.income > 50000)
GROUP BY c.category;
```

## Complexity

- **Time:** `O(n)` — a single pass over `Accounts` to classify and count each row.
- **Space:** `O(1)` beyond the fixed three-row result set.
