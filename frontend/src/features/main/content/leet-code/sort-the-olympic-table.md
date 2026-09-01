# 2377. Sort the Olympic Table

**Difficulty:** Easy
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Table `Olympic(country, gold, silver, bronze)` stores medal counts per country. Return all rows ordered by number of gold medals descending; ties broken by silver medals descending; further ties broken by bronze medals descending; remaining ties broken by country name ascending.

### Schema

```
Olympic: country (PK), gold, silver, bronze
```

## Approach

A single multi-column `ORDER BY` expresses the full ranking rule directly.

## SQL Solution

```sql
SELECT country, gold, silver, bronze
FROM Olympic
ORDER BY gold DESC, silver DESC, bronze DESC, country ASC;
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(n)
