# OLTP versus OLAP Database Design

OLTP databases run many small transactions, such as placing orders. They usually use normalized tables and quick lookups. OLAP databases answer reports over large amounts of data and usually use fact tables, dimensions, and large scans.

```sql
SELECT d.region, SUM(f.revenue) AS revenue
FROM fact_sales AS f
JOIN dim_customer AS d ON d.customer_key = f.customer_key
GROUP BY d.region;
```

Do not run large reports on the main OLTP database if they slow down customer transactions. Use a replica, change-data capture, or a data warehouse for reporting.

## Star Schema: The Standard OLAP Modeling Pattern

```sql
-- Fact table: one row per event/transaction, mostly foreign keys + numeric measures
CREATE TABLE fact_sales (
  sale_id BIGINT,
  customer_key INT,   -- FK to dim_customer
  product_key INT,    -- FK to dim_product
  date_key INT,       -- FK to dim_date
  revenue DECIMAL(12,2),
  quantity INT
);

-- Dimension table: descriptive attributes for filtering/grouping, not high-volume
CREATE TABLE dim_customer (
  customer_key INT PRIMARY KEY,
  customer_name VARCHAR(100),
  region VARCHAR(50),
  segment VARCHAR(50)
);
```

A **fact table** holds the numeric measures of business events (revenue, quantity) plus foreign keys into **dimension tables** (who, what, when, where) that hold the descriptive attributes used for filtering and grouping. This separation is why OLAP queries look like the `GROUP BY` example above — join a small number of narrow dimension tables to one large fact table, rather than joining many normalized OLTP tables together.

**Slowly Changing Dimensions (SCD)**: when a dimension attribute changes over time (e.g. a customer moves regions), a data warehouse typically needs to decide whether to overwrite the old value (SCD Type 1 — loses history) or insert a new dimension row with a validity date range (SCD Type 2 — preserves the ability to report "what region was this sale originally attributed to at the time it happened").

## Tricky Interview Questions

**Q: Why not use one database for both orders and reports?**

**A:** Large reports can use CPU, memory, and disk needed by customer transactions. Separate reporting workloads when they affect OLTP performance.