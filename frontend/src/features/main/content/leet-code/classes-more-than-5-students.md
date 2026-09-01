# 596. Classes More Than 5 Students

**Difficulty:** Easy
**Category:** SQL, Database

## Problem

Given a `Courses` table (`student`, `class`), write a query to report all classes that have at least 5 distinct students enrolled.

### Schema

```
Courses: (student, class)
```

## Approach

Group enrollment rows by `class`, then filter to groups containing 5 or more distinct students — using `COUNT(DISTINCT student)` guards against counting the same student twice if duplicate enrollment rows exist.

## SQL Solution

```sql
SELECT class
FROM Courses
GROUP BY class
HAVING COUNT(DISTINCT student) >= 5;
```

## Complexity

- **Time:** `O(n)`, where `n` is the number of enrollment rows.
- **Space:** `O(n)` for the grouped intermediate result.
