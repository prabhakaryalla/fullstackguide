# NULL and Three-Valued Logic

`NULL` means unknown or missing. It is not equal to zero, an empty string, or another `NULL`. Comparisons with `NULL` produce Unknown, not True or False.

```sql
SELECT employee_id, employee_name
FROM employees
WHERE manager_id IS NULL;
```

Use `IS NULL` and `IS NOT NULL`, never `= NULL`. Be careful with `NOT IN`: if its list contains `NULL`, the result can become Unknown for every row. `NOT EXISTS` is often safer.

```sql
SELECT c.customer_id
FROM customers AS c
WHERE NOT EXISTS (
  SELECT 1 FROM blocked_customers AS b
  WHERE b.customer_id = c.customer_id
);
```

## The Three-Valued Truth Tables

SQL's `WHERE`/`HAVING` only keep rows where the condition evaluates to **TRUE** — `UNKNOWN` (like `FALSE`) filters the row out, which is what makes `NULL` handling so easy to get subtly wrong.

| AND | TRUE | FALSE | UNKNOWN |
|---|---|---|---|
| **TRUE** | TRUE | FALSE | UNKNOWN |
| **FALSE** | FALSE | FALSE | FALSE |
| **UNKNOWN** | UNKNOWN | FALSE | UNKNOWN |

| OR | TRUE | FALSE | UNKNOWN |
|---|---|---|---|
| **TRUE** | TRUE | TRUE | TRUE |
| **FALSE** | TRUE | FALSE | UNKNOWN |
| **UNKNOWN** | TRUE | UNKNOWN | UNKNOWN |

Note the asymmetry: `FALSE AND UNKNOWN` is definitively `FALSE` (no matter what the unknown value turns out to be, the AND can never be true), but `TRUE AND UNKNOWN` stays `UNKNOWN`. Similarly `TRUE OR UNKNOWN` is `TRUE`, but `FALSE OR UNKNOWN` stays `UNKNOWN`.

## GROUP BY and Aggregate NULL Handling

- `GROUP BY` treats all `NULL`s as **one group** together (even though `NULL = NULL` is `UNKNOWN` everywhere else) — rows with a `NULL` grouping column all land in a single "NULL" group rather than each being its own group or being excluded.
- Aggregate functions like `SUM`, `AVG`, `COUNT(column)` **ignore `NULL` values** entirely (they don't count as zero) — `AVG(salary)` over `[1000, NULL, 3000]` is `2000` (averaging only the two non-null values), not `1333.33`.
- `COUNT(*)` counts rows regardless of `NULL`s; `COUNT(column)` counts only rows where that column is non-null — a frequent source of subtly different numbers between the two in the same query.

## Common Patterns

```sql
-- Why WHERE x != 5 excludes rows where x IS NULL:
-- x != 5 evaluates to UNKNOWN when x is NULL, and UNKNOWN rows are filtered out
SELECT * FROM products WHERE price != 5;  -- silently skips rows with price IS NULL

-- COALESCE / NULLIF patterns
SELECT COALESCE(discount, 0) AS discount FROM products;      -- treat missing discount as 0
SELECT NULLIF(quantity, 0) AS safe_quantity FROM inventory;  -- turn 0 into NULL to avoid divide-by-zero later
```

## Tricky / Follow-up Questions

**Q: What does `NULL + 10` return?**

**A:** Usually `NULL`, because the result is still unknown. Use `COALESCE(value, 0)` when missing should mean zero.