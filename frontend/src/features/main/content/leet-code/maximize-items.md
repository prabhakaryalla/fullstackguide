# 3052. Maximize Items

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

A warehouse has a `500000` square-foot storage limit. Items are grouped into `prime_eligible` and `not_prime` categories, each item occupying `square_footage` space. Warehouse space is allocated to `prime_eligible` items first (as many full "sets" of the category's total footage as fit), and any footage left over is used for `not_prime` items. Write a solution reporting, for each `item_type`, the maximum number of items of that type that fit under this allocation rule.

### Schema

```sql
Create table If Not Exists Inventory (item_type ENUM('prime_eligible', 'not_prime'), item_id int, square_footage int)
```

`Inventory` has one row per item with its `item_type` and `square_footage`.

## Approach

Compute the total footage of all `prime_eligible` items. The warehouse can fit `floor(500000 / primeSumFootage)` full copies of the entire prime set, so the prime item count is `(number of prime items) * that multiplier`. The remaining space, `500000 mod primeSumFootage`, is available for `not_prime` items, and how many of those fit is `floor(remainingSpace / notPrimeSumFootage) * (number of not_prime items)`.

## SQL Solution

```sql
WITH Prime AS (
  SELECT SUM(square_footage) AS prime_footage, COUNT(*) AS prime_count
  FROM Inventory
  WHERE item_type = 'prime_eligible'
),
NotPrime AS (
  SELECT SUM(square_footage) AS not_prime_footage, COUNT(*) AS not_prime_count
  FROM Inventory
  WHERE item_type = 'not_prime'
)
SELECT
  'prime_eligible' AS item_type,
  Prime.prime_count * FLOOR(500000 / Prime.prime_footage) AS item_count
FROM Prime
UNION ALL
SELECT
  'not_prime',
  NotPrime.not_prime_count *
    FLOOR((500000 % Prime.prime_footage) / NotPrime.not_prime_footage)
FROM Prime, NotPrime;
```

## Complexity

- Time: O(n) to aggregate the sums and counts, where n is the number of inventory rows.
- Space: O(1) beyond the aggregated totals.
