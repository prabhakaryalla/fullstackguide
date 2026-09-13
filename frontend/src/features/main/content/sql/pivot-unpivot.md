# PIVOT and UNPIVOT

Pivoting turns row values into columns, which is useful for reports. Unpivoting changes columns back into rows. Vendor syntax differs, so conditional aggregation is often more portable.

### SQL Server and PostgreSQL (conditional aggregation)

```sql
SELECT product_id,
       SUM(CASE WHEN month_number = 1 THEN revenue ELSE 0 END) AS january,
       SUM(CASE WHEN month_number = 2 THEN revenue ELSE 0 END) AS february
FROM monthly_product_sales
GROUP BY product_id;
```

### SQL Server (native PIVOT)

```sql
SELECT product_id, [1] AS january, [2] AS february
FROM monthly_product_sales
PIVOT (
  SUM(revenue) FOR month_number IN ([1], [2])
) AS pivoted;
```

PostgreSQL has no built-in `PIVOT` keyword; conditional aggregation or the `tablefunc` extension's `crosstab` function is used instead.

## UNPIVOT: Columns Back into Rows

Unpivoting takes separate columns, such as `january` and `february`, and turns them back into one column of row values.

### SQL Server (native UNPIVOT)

```sql
SELECT product_id, month_name, revenue
FROM monthly_product_sales_wide
UNPIVOT (
  revenue FOR month_name IN (january, february)
) AS unpivoted;
```

### SQL Server and PostgreSQL (portable UNION ALL)

```sql
SELECT product_id, 'january' AS month_name, january AS revenue
FROM monthly_product_sales_wide
UNION ALL
SELECT product_id, 'february' AS month_name, february AS revenue
FROM monthly_product_sales_wide;
```

PostgreSQL has no built-in `UNPIVOT` keyword; the `UNION ALL` version above, or a lateral join over a `VALUES` list, is used instead:

```sql
SELECT w.product_id, v.month_name, v.revenue
FROM monthly_product_sales_wide AS w
CROSS JOIN LATERAL (VALUES
  ('january', w.january),
  ('february', w.february)
) AS v(month_name, revenue);
```

## Tricky / Follow-up Questions

**Q: Why can a pivot be difficult to maintain?**

**A:** The output columns are often fixed. New months, regions, or categories may require dynamic SQL or application-side formatting.

**Q: Why use `LATERAL` with `VALUES` instead of `UNION ALL` for an unpivot?**

**A:** `UNION ALL` needs one `SELECT` per source column, which grows the query as columns grow. The lateral `VALUES` form lists the columns once and scales better for wide tables.