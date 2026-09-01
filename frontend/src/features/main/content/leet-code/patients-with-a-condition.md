# 1527. Patients With a Condition

**Difficulty:** Easy
**Category:** Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a table `Patients(patient_id, patient_name, conditions)` where `conditions` contains 0 or more space-separated codes, find the patients who have a condition code that starts with `DIAB1` (i.e., Type I Diabetes).

### Example

```
Input: Patients: (1, "Daniel", "YFEV COUGH"), (2, "Alice", ""), (3, "Bob", "DIAB100 MYOP")
Output: [(3, "Bob", "DIAB100 MYOP")]
```

## Approach

This is a SQL problem (no C# solution applies). Match `conditions` where a code starting with `DIAB1` appears either at the very start of the string or after a space, to avoid matching codes that merely contain `DIAB1` as a substring elsewhere (e.g. `XDIAB100`).

```sql
SELECT *
FROM Patients
WHERE conditions LIKE 'DIAB1%' OR conditions LIKE '% DIAB1%';
```

## Complexity

- **Time:** `O(n * L)` — a pattern match per row, where `L` is the average length of `conditions`.
- **Space:** `O(n)` for the result set.
