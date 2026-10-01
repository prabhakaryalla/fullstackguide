# SQL Set Operators

Set operators combine results from two queries. Both queries must return the same number of compatible columns.

```sql
SELECT customer_id FROM online_orders
UNION
SELECT customer_id FROM store_orders;
```

`UNION` removes duplicates. `UNION ALL` keeps duplicates and is usually faster. `INTERSECT` returns values in both sets. `EXCEPT` returns values in the first set but not the second.

```sql
SELECT customer_id FROM customers
EXCEPT
SELECT customer_id FROM orders;
```

## The Performance Cost of UNION vs. UNION ALL

`UNION` has to **de-duplicate** the combined result, which typically means the database sorts (or hashes) the entire combined row set to find and remove duplicates — an extra, potentially expensive operation on top of running both queries. `UNION ALL` skips that step entirely and simply concatenates both result sets.

**Rule of thumb: default to `UNION ALL`, and only pay for `UNION`'s de-duplication when you specifically know duplicates are possible and unwanted.** A very common mistake is using `UNION` out of habit on two queries that can never produce overlapping rows (e.g. combining `online_orders` and `store_orders` by disjoint order-source), silently paying a sort/hash cost for a de-duplication that could never remove anything.

## NULL Handling in Set Operators

Unlike most SQL comparisons — where `NULL = NULL` evaluates to `UNKNOWN`, not `TRUE` — set operators treat two `NULL`s as **equal** for the purpose of matching/de-duplicating rows. So `SELECT NULL UNION SELECT NULL` returns a single `NULL` row, not two, even though `NULL = NULL` would normally never match in a `WHERE` clause. This is a common gotcha: the equality semantics used internally by `UNION`/`INTERSECT`/`EXCEPT` are **not** the same three-valued logic used elsewhere in SQL.

## Column Name Resolution

The **column names in the final result come from the first query** in the set operation — a second/later query's column aliases are ignored for naming purposes, even though its values are still included:

```sql
SELECT customer_id AS id FROM online_orders  -- result column is named "id"
UNION
SELECT customer_id AS customer FROM store_orders; -- this alias is ignored
```

## Tricky / Follow-up Questions

**Q: When should you prefer `UNION ALL`?**

**A:** Use it when duplicates are meaningful or already impossible. Avoiding duplicate removal saves sorting or hashing work.

**Q: Does `UNION` treat two NULLs as equal when de-duplicating?**

**A:** Yes — this is a special case. Set operators use a different equality rule than `WHERE`/`JOIN` predicates specifically so that NULL values can be recognized as duplicates and collapsed.
