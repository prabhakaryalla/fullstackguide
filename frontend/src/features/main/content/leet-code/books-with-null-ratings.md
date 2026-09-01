# 3358. Books With Null Ratings

**Difficulty:** Easy
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given a `Books` table containing each book's title and rating, return the `book_id` and `title` of every book whose `rating` is `NULL` (i.e., has not yet been rated).

### Schema
```sql
Create table If Not Exists Books (book_id int, title varchar(50), rating float)
```

## Approach
Filter the table directly with `WHERE rating IS NULL`, since SQL requires the explicit `IS NULL` predicate rather than an equality comparison to detect null values.

## SQL Solution

```sql
SELECT book_id, title
FROM Books
WHERE rating IS NULL;
```

## Complexity

- **Time:** O(n)
- **Space:** O(n)
