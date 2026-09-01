# 3465. Find Products with Valid Serial Numbers

**Difficulty:** Easy
**Category:** Database, String Matching, Regular Expressions

## Problem
Table `Products` has columns `product_id` (primary key) and `description`. A product has a **valid serial number** if its `description` contains a token of the form `SN` followed by exactly four digits (e.g. `SN1234`), and that token is not directly adjacent to any other letter or digit — it must be bounded on both sides by either the start/end of the string or a non-alphanumeric character (so `XSN1234` or `SN12345` would not count).

Write a solution to return the `product_id` and `description` of every product that contains at least one valid serial number, ordered by `product_id`.

## Approach
A regular expression can express the "word boundary" requirement directly: match `SN` followed by exactly four digits, where the character immediately before the match (if any) and immediately after (if any) are not letters or digits. MySQL's `REGEXP` (ICU regex) supports this via alternation with `^`/`$` and negated character classes.

## SQL Solution
```sql
SELECT product_id, description
FROM Products
WHERE description REGEXP '(^|[^A-Za-z0-9])SN[0-9]{4}([^A-Za-z0-9]|$)'
ORDER BY product_id;
```

## Complexity
- **Time:** O(n · L), where n is the number of rows and L is the average length of `description`.
- **Space:** O(1) additional space beyond the result set.
