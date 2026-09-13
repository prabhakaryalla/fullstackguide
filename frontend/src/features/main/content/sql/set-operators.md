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

## Tricky / Follow-up Questions

**Q: When should you prefer `UNION ALL`?**

**A:** Use it when duplicates are meaningful or already impossible. Avoiding duplicate removal saves sorting or hashing work.