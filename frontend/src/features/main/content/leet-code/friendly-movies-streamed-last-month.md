# 1495. Friendly Movies Streamed Last Month

**Difficulty:** Easy
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a `TVProgram` table (`program_date`, `content_id`, `channel`) and a `Content` table (`content_id`, `title`, `Type`, `Kids_content`), return the titles of movies suitable for kids that were streamed during June 2020.

### Schema

```
TVProgram: (program_date, content_id) (PK), channel
Content: content_id (PK), title, Type, Kids_content
```

## Approach

Join the two tables on `content_id`, then filter to rows where `Kids_content = 'Y'`, `Type = 'Movies'`, and `program_date` falls within June 2020. Since a movie could air multiple times, select distinct titles.

## SQL Solution

```sql
SELECT DISTINCT c.title
FROM TVProgram t
JOIN Content c ON t.content_id = c.content_id
WHERE c.Kids_content = 'Y'
  AND c.Type = 'Movies'
  AND t.program_date BETWEEN '2020-06-01' AND '2020-06-30';
```

## Complexity

- **Time:** `O(n)` for the join and filter.
- **Space:** `O(n)` for the result set.
