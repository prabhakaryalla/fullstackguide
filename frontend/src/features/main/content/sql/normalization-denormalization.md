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

## Tricky Interview Questions

**Q: Is a fully normalized database always better?**

**A:** No. Normalization protects data quality, but carefully chosen duplication can make important reads faster. The tradeoff is keeping copies correct.