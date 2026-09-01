# 1393. Capital Gain/Loss

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Stocks` table (`stock_name`, `operation` of `'Buy'` or `'Sell'`, `operation_day`, `price`), write a query that reports each stock's total capital gain or loss (total sell proceeds minus total buy cost).

### Schema

```
Stocks: stock_name, operation, operation_day, price
```

## Approach

Treat every `'Sell'` price as a positive contribution and every `'Buy'` price as a negative contribution, then sum these signed values grouped by `stock_name`.

## SQL Solution

```sql
SELECT stock_name,
       SUM(CASE WHEN operation = 'Sell' THEN price ELSE -price END) AS capital_gain_loss
FROM Stocks
GROUP BY stock_name;
```

## Complexity

- **Time:** `O(n)` for the grouped aggregation.
- **Space:** `O(distinct stock_name)`.
