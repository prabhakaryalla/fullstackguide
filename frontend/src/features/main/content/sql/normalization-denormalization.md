# Normalization and Denormalization

Normalization stores each piece of information once. It reduces duplicate data and prevents update mistakes. Denormalization copies some data on purpose to make common reads faster.

```sql
CREATE TABLE order_totals (
  order_id BIGINT PRIMARY KEY,
  customer_id BIGINT NOT NULL,
  total_amount DECIMAL(12, 2) NOT NULL
);
```

If a copied value changes, all copies must stay correct. Choose denormalization only after checking query speed, write volume, consistency needs, and maintenance cost.

## The Normal Forms, Briefly

- **1NF (First Normal Form)**: every column holds a single, atomic value — no comma-separated lists or repeating groups in one cell. `phone_numbers: "555-1111,555-2222"` in one column violates 1NF; a separate `customer_phones` table (one row per phone number) satisfies it.
- **2NF**: satisfies 1NF, and every non-key column depends on the **entire** primary key, not just part of it — relevant when the primary key is composite. If `(order_id, product_id)` is the key but `product_name` depends only on `product_id`, storing `product_name` in the order-line table violates 2NF (move it to a `products` table).
- **3NF**: satisfies 2NF, and no non-key column depends on **another non-key column** (no "transitive" dependency). Storing both `zip_code` and `city` on a `customers` table, where `city` is fully determined by `zip_code`, is a 3NF violation — `city` should live in a `zip_codes` lookup table instead.

## When Denormalization Is Justified

- **OLTP (transactional) systems**: normalize by default — update anomalies (forgetting to update one of several copies) are a real, ongoing risk in a system with constant writes.
- **Reporting/data-warehouse (OLAP) systems**: denormalization is standard practice — a denormalized fact table can turn a report that would otherwise need 5 joins into a single-table scan, which matters enormously at reporting scale where read performance dominates and writes are batch/infrequent (so update-anomaly risk is low).
- **Concrete example**: an order-history report that joins `orders` → `customers` → `products` → `categories` (4 joins) on every page load can instead read from a denormalized `order_report` table with `customer_name`, `product_name`, and `category_name` already copied in — turning 4 joins into 0, at the cost of needing to refresh those copied columns if the source data changes (typically handled via a scheduled ETL job, not real-time triggers).

## Tricky Interview Questions

**Q: Is a fully normalized database always better?**

**A:** No. Normalization protects data quality, but carefully chosen duplication can make important reads faster. The tradeoff is keeping copies correct.