# 1098. Unpopular Books

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `Books` table (`book_id`, `name`, `available_from`) and an `Orders` table (`order_id`, `book_id`, `quantity`, `dispatch_date`), write a query to report the IDs and names of books that sold fewer than `10` copies in the last year (relative to `'2019-06-23'`), excluding books that have been available for less than one month.

### Schema

```
Books: book_id (PK), name, available_from
Orders: order_id, book_id (FK), quantity, dispatch_date
```

## Approach

Left join `Books` to `Orders`, but only match order rows within the last year's dispatch window — this way, books with zero qualifying orders still appear (with `NULL` quantities) rather than being dropped, which an inner join would incorrectly do. First filter out books that haven't been available for at least a month. Then group by book and keep only those whose summed quantity (treating `NULL` as `0` via `IFNULL`) is below `10`.

## SQL Solution

```sql
SELECT b.book_id, b.name
FROM Books b
LEFT JOIN Orders o
    ON b.book_id = o.book_id
    AND o.dispatch_date BETWEEN DATE_SUB('2019-06-23', INTERVAL 1 YEAR) AND '2019-06-23'
WHERE b.available_from < DATE_SUB('2019-06-23', INTERVAL 1 MONTH)
GROUP BY b.book_id, b.name
HAVING IFNULL(SUM(o.quantity), 0) < 10;
```

## Complexity

- **Time:** `O(n)` for the join and grouping scan.
- **Space:** `O(books)` for the grouped result.
