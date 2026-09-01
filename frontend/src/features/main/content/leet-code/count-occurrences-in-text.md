# 2738. Count Occurrences in Text

**Difficulty:** Medium
**Category:** SQL, Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Table `Files` has columns `file_name` and `content`. Write a solution to find the number of files that contain the word `"bull"` as a standalone word (surrounded by spaces or at the start/end of the content) and the number of files that contain the word `"bear"` as a standalone word. Return a single row with the two counts as `bull_count` and `bear_count`.

### Schema

```
Files
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| file_name   | varchar |
| content     | text    |
+-------------+---------+
```

## SQL Solution

```sql
SELECT
    SUM(CASE WHEN CONCAT(' ', content, ' ') LIKE '% bull %' THEN 1 ELSE 0 END) AS bull_count,
    SUM(CASE WHEN CONCAT(' ', content, ' ') LIKE '% bear %' THEN 1 ELSE 0 END) AS bear_count
FROM Files;
```

## Complexity

- **Time:** O(n) where n is the number of rows/characters scanned
- **Space:** O(1) extra space
