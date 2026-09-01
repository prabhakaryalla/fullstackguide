# 3705. Find Golden Hour Customers

**Difficulty:** Medium
**Category:** Database

## Problem

Table `restaurant_orders` has columns `order_id`, `customer_id`, `order_timestamp` (date and time), `order_amount`, `payment_method`, and `order_rating` (1-5, or `NULL` if not rated).

Find golden hour customers: customers who consistently order during peak hours and provide high satisfaction. A customer qualifies if they meet **all** of the following:

- Made at least 3 orders.
- At least 60% of their orders fall in peak hours (`11:00-14:00` or `18:00-21:00`).
- Their average rating for rated orders is at least 4.0 (rounded to 2 decimal places).
- They have rated at least 50% of their orders.

Return the result ordered by `average_rating` descending, then by `customer_id` descending.

### Example

```
Input: A customer with 4 orders, all in peak hours, 3 of which are rated 5, 4, 5.
Output: customer_id, total_orders = 4, peak_hour_percentage = 100, average_rating = 4.67
```

## Approach

Group orders by `customer_id`. For each group, count the total orders, count how many fall inside either peak-hour window, and compute the average of the non-null ratings (MySQL's `AVG` ignores `NULL`s automatically). Filter groups using `HAVING` to enforce the minimum order count, peak-hour percentage, average rating, and rated-order percentage, then sort the qualifying rows as required.

## SQL Solution

```sql
SELECT
    customer_id,
    COUNT(*) AS total_orders,
    ROUND(SUM(CASE
        WHEN TIME(order_timestamp) BETWEEN '11:00:00' AND '13:59:59'
          OR TIME(order_timestamp) BETWEEN '18:00:00' AND '20:59:59'
        THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) AS peak_hour_percentage,
    ROUND(AVG(order_rating), 2) AS average_rating
FROM restaurant_orders
GROUP BY customer_id
HAVING COUNT(*) >= 3
   AND SUM(CASE
        WHEN TIME(order_timestamp) BETWEEN '11:00:00' AND '13:59:59'
          OR TIME(order_timestamp) BETWEEN '18:00:00' AND '20:59:59'
        THEN 1 ELSE 0 END) * 1.0 / COUNT(*) >= 0.6
   AND AVG(order_rating) >= 4.0
   AND SUM(CASE WHEN order_rating IS NOT NULL THEN 1 ELSE 0 END) * 1.0 / COUNT(*) >= 0.5
ORDER BY average_rating DESC, customer_id DESC;
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of orders.
- **Space:** `O(c)`, where `c` is the number of distinct customers.
