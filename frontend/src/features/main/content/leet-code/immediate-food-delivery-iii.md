# 2686. Immediate Food Delivery III

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Table: Delivery

```
+-----------------------------+---------+
| Column Name                 | Type    |
+-----------------------------+---------+
| delivery_id                 | int     |
| customer_id                 | int     |
| order_date                  | date    |
| customer_pref_delivery_date | date    |
+-----------------------------+---------+
```

`delivery_id` is the primary key. Each row contains information about food delivery to a customer.

If the customer's preferred delivery date is the same as the order date, the order is called immediate, otherwise it is scheduled.

Write an SQL query to find the percentage of immediate orders on each unique order_date, rounded to 2 decimal places.

### Schema

```sql
CREATE TABLE Delivery (
    delivery_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    customer_pref_delivery_date DATE
);
```

### Example

```
Input:
Delivery table:
+-------------+-------------+------------+-----------------------------+
| delivery_id | customer_id | order_date | customer_pref_delivery_date |
+-------------+-------------+------------+-----------------------------+
| 1           | 1           | 2019-08-01 | 2019-08-02                  |
| 2           | 5           | 2019-08-01 | 2019-08-01                  |
| 3           | 1           | 2019-08-02 | 2019-08-02                  |
| 4           | 3           | 2019-08-11 | 2019-08-11                  |
| 5           | 4           | 2019-08-11 | 2019-08-13                  |
+-------------+-------------+------------+-----------------------------+

Output:
+------------+----------------------+
| order_date | immediate_percentage |
+------------+----------------------+
| 2019-08-01 | 50.00                |
| 2019-08-02 | 100.00               |
| 2019-08-11 | 50.00                |
+------------+----------------------+
```

## Approach

Group by order_date and calculate the percentage of immediate orders (where order_date equals customer_pref_delivery_date) for each date.

## SQL Solution

```sql
SELECT 
    order_date,
    ROUND(
        100.0 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) / COUNT(*),
        2
    ) AS immediate_percentage
FROM Delivery
GROUP BY order_date
ORDER BY order_date;
```

## Complexity

- **Time:** O(n) for scanning the table
- **Space:** O(d) where d is the number of distinct order dates
