# 3050. Pizza Toppings Cost Analysis

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a solution to report every possible 3-topping pizza combination (no repeated toppings within a combination, and each unordered combination reported only once) along with its total cost, ordered by total cost descending, then by the pizza's topping list ascending.

### Schema

```sql
Create table If Not Exists Toppings (topping_name varchar(20), cost decimal(10,2))
```

`Toppings` holds one row per topping with its individual `cost`.

## Approach

Self-join the `Toppings` table with itself three times, using a strict `<` ordering on `topping_name` between the joined copies to guarantee each unordered triple of distinct toppings is produced exactly once (instead of every permutation). Sum the three costs, round to two decimals, and concatenate the three names for the display column.

## SQL Solution

```sql
SELECT
  CONCAT(t1.topping_name, ',', t2.topping_name, ',', t3.topping_name) AS pizza,
  ROUND(t1.cost + t2.cost + t3.cost, 2) AS total_cost
FROM Toppings t1
JOIN Toppings t2 ON t1.topping_name < t2.topping_name
JOIN Toppings t3 ON t2.topping_name < t3.topping_name
ORDER BY total_cost DESC, pizza ASC;
```

## Complexity

- Time: O(n^3) in the worst case for the triple self-join, where n is the number of toppings.
- Space: O(n^3) for the intermediate joined rows before sorting.
