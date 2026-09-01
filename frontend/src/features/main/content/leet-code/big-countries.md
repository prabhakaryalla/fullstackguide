# 595. Big Countries

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given a `World` table (`name`, `continent`, `area`, `population`, `gdp`), write a query to report the name, population, and area of the "big" countries — those with an area of at least 3,000,000 km² or a population of at least 25,000,000.

### Schema

```
World: name (PK), continent, area, population, gdp
```

## Approach

Filter rows where either the `area` or `population` threshold condition holds, combining them with a logical `OR` since a country only needs to satisfy one of the two criteria to qualify as "big."

## SQL Solution

```sql
SELECT name, population, area
FROM World
WHERE area >= 3000000 OR population >= 25000000;
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of countries.
- **Space:** `O(n)` for the result set.
