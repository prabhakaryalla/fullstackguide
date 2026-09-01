# 2480. Form a Chemical Bond

**Difficulty:** Easy
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Write a SQL query to find all pairs of atoms that can form a chemical bond. Two atoms can form a bond if one is a Metal and the other is a Nonmetal.

### Schema

```sql
Table: Elements
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| symbol      | varchar |
| type        | varchar |
| electrons   | int     |
+-------------+---------+
symbol is the primary key.
type is either 'Metal' or 'Nonmetal'.
```

### Example

```
Input:
Elements table:
+--------+----------+-----------+
| symbol | type     | electrons |
+--------+----------+-----------+
| He     | Nonmetal | 0         |
| Na     | Metal    | 1         |
| Ca     | Metal    | 2         |
| La     | Metal    | 3         |
| Cl     | Nonmetal | 1         |
| O      | Nonmetal | 2         |
+--------+----------+-----------+

Output:
+--------+----------+
| metal  | nonmetal |
+--------+----------+
| Ca     | He       |
| Ca     | Cl       |
| Ca     | O        |
| La     | He       |
| La     | Cl       |
| La     | O        |
| Na     | He       |
| Na     | Cl       |
| Na     | O        |
+--------+----------+
```

## Approach

Use a self-join or cross join on the Elements table where one element is Metal and the other is Nonmetal. Order the results by metal symbol and then nonmetal symbol.

## SQL Solution

```sql
SELECT 
    m.symbol AS metal,
    n.symbol AS nonmetal
FROM 
    Elements m
CROSS JOIN 
    Elements n
WHERE 
    m.type = 'Metal' 
    AND n.type = 'Nonmetal'
ORDER BY 
    m.symbol, n.symbol;
```

## Complexity

- **Time:** O(n * m) where n is number of metals and m is number of nonmetals
- **Space:** O(1) excluding the result set
