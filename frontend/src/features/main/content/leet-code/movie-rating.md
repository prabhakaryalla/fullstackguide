# 1341. Movie Rating

**Difficulty:** Medium
**Category:** SQL, Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given `Movies`, `Users`, and `MovieRating` tables, report the name of the user who rated the most movies (ties broken alphabetically), and the title of the movie with the highest average rating in February 2020 (ties broken alphabetically), as a single `results` column.

### Schema

```
Movies: movie_id (PK), title
Users: user_id (PK), name
MovieRating: movie_id, user_id, rating, created_at
```

## Approach

Compute the two answers independently and stack them with `UNION ALL`: the most prolific rater is found by grouping ratings by `user_id`, ordering by count descending then name ascending; the top February movie is found by grouping ratings within that month by `movie_id`, ordering by average rating descending then title ascending.

## SQL Solution

```sql
(SELECT u.name AS results
 FROM Users u
 JOIN MovieRating mr ON u.user_id = mr.user_id
 GROUP BY mr.user_id
 ORDER BY COUNT(*) DESC, u.name ASC
 LIMIT 1)
UNION ALL
(SELECT m.title AS results
 FROM Movies m
 JOIN MovieRating mr ON m.movie_id = mr.movie_id
 WHERE mr.created_at >= '2020-02-01' AND mr.created_at < '2020-03-01'
 GROUP BY mr.movie_id
 ORDER BY AVG(mr.rating) DESC, m.title ASC
 LIMIT 1);
```

## Complexity

- **Time:** `O(n log n)` for the two grouped sorts.
- **Space:** `O(n)`.
