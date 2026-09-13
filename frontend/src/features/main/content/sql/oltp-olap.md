# OLTP versus OLAP Database Design

OLTP databases run many small transactions, such as placing orders. They usually use normalized tables and quick lookups. OLAP databases answer reports over large amounts of data and usually use fact tables, dimensions, and large scans.

```sql
SELECT d.region, SUM(f.revenue) AS revenue
FROM fact_sales AS f
JOIN dim_customer AS d ON d.customer_key = f.customer_key
GROUP BY d.region;
```

Do not run large reports on the main OLTP database if they slow down customer transactions. Use a replica, change-data capture, or a data warehouse for reporting.

## Tricky Interview Questions

**Q: Why not use one database for both orders and reports?**

**A:** Large reports can use CPU, memory, and disk needed by customer transactions. Separate reporting workloads when they affect OLTP performance.