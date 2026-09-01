# 1623. All Valid Triplets That Can Represent a Country

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given three tables `SchoolA`, `SchoolB`, and `SchoolC` (each with `student_id`, `student_name`), return all valid triplets — one representative from each school — such that no student is a member of more than one school (i.e., the three chosen `student_id` values are pairwise distinct).

### Schema

```
SchoolA: student_id (PK), student_name
SchoolB: student_id (PK), student_name
SchoolC: student_id (PK), student_name
```

## Approach

Cross join the three tables and filter out combinations that reuse the same `student_id` across schools, since a student registered in more than one school cannot represent multiple members of the same triplet.

## SQL Solution

```sql
SELECT
    a.student_name AS member_A,
    b.student_name AS member_B,
    c.student_name AS member_C
FROM SchoolA a
CROSS JOIN SchoolB b
CROSS JOIN SchoolC c
WHERE a.student_id != b.student_id
  AND a.student_id != c.student_id
  AND b.student_id != c.student_id;
```

## Complexity

- **Time:** `O(a * b * c)`, where `a`, `b`, `c` are the table sizes.
- **Space:** `O(a * b * c)` for the result set in the worst case.
