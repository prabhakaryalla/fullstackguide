# 1571. Warehouse Manager

**Difficulty:** Easy
**Category:** Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given tables `Warehouse(name, product_id, units)` and `Products(product_id, product_name, Width, Length, Height)`, compute the total occupied space (volume) for each warehouse.

### Example

```
Input: Warehouse: ("LCHouse1", 1, 1), Products: (1, "LC-TV", 5, 50, 40)
Output: ("LCHouse1", 10000)
```

## Approach

This is a SQL problem (no C# solution applies). Join `Warehouse` with `Products` to get each product's volume (`Width * Length * Height`), multiply by the stored `units`, and sum per warehouse.

```sql
SELECT
    w.name AS warehouse_name,
    SUM(w.units * p.Width * p.Length * p.Height) AS space
FROM Warehouse w
JOIN Products p ON w.product_id = p.product_id
GROUP BY w.name;
```

## Complexity

- **Time:** `O(n)` — a single join-and-aggregate pass over the warehouse rows.
- **Space:** `O(n)` for the grouped result set.
