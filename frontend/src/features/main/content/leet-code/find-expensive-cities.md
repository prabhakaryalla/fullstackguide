# 2987. Find Expensive Cities

**Difficulty:** Easy
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

### Schema

```sql
Table: Listings
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| listing_id  | int      |
| city        | varchar  |
| price       | int      |
+-------------+----------+
listing_id is the primary key.
```

Find cities where the average listing price is strictly greater than the overall average price across all cities. Return city names in any order.

### Example

```
Input:
Listings table:
+------------+----------+-------+
| listing_id | city     | price |
+------------+----------+-------+
| 1          | Manila   | 50    |
| 2          | Manila   | 60    |
| 3          | Seattle  | 100   |
+------------+----------+-------+
Output:
+----------+
| city     |
+----------+
| Seattle  |
+----------+
Explanation: Average(Manila) = 55, Average(Seattle) = 100, Overall = 70. Seattle > 70.
```

## Approach

Calculate the overall average, then group by city and filter cities with average > overall average.

## SQL Solution

```sql
SELECT city
FROM Listings
GROUP BY city
HAVING AVG(price) > (SELECT AVG(price) FROM Listings);
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
