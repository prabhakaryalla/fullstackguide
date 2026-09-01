# 571. Find Median Given Frequency of Numbers

**Difficulty:** Hard
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Numbers` table (`Number`, `Frequency`) representing a large dataset compressed as distinct numbers with their occurrence counts, write a query to report the median of the entire dataset.

### Schema

```
Numbers: Number (PK), Frequency
```

## Approach

For a candidate number to be (part of) the median, the total frequency of all numbers less than or equal to it must reach at least half of the overall total frequency, and symmetrically for numbers greater than or equal to it. Compute both cumulative frequency sums via correlated subqueries for every candidate number, filter to rows satisfying both conditions (which will be either one row for an odd total, or two adjacent rows for an even total), and average their values to get the median.

## SQL Solution

```sql
SELECT AVG(n1.Number) AS median
FROM Numbers n1
WHERE (
    SELECT SUM(n2.Frequency)
    FROM Numbers n2
    WHERE n2.Number <= n1.Number
) >= (SELECT SUM(Frequency) FROM Numbers) / 2
AND (
    SELECT SUM(n3.Frequency)
    FROM Numbers n3
    WHERE n3.Number >= n1.Number
) >= (SELECT SUM(Frequency) FROM Numbers) / 2;
```

## Complexity

- **Time:** `O(n^2)` due to the correlated subqueries per candidate row.
- **Space:** `O(n)` for the intermediate cumulative sums.
