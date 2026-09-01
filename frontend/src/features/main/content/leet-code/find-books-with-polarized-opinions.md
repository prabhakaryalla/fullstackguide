# 3642. Find Books with Polarized Opinions

**Difficulty:** Medium
**Category:** Database

## Problem
Table `books` has columns `book_id`, `title`, `author`, `genre`, `pages`. Table `reading_sessions` has columns `session_id`, `book_id`, `reader_name`, `pages_read`, `session_rating` (1-5).

Find books with polarized opinions: books that receive both very high and very low ratings from different readers.

- A book has polarized opinions if it has at least one rating `>= 4` and at least one rating `<= 2`.
- Only consider books with at least 5 reading sessions.
- Compute the rating spread as `highest_rating - lowest_rating`.
- Compute the polarization score as the number of extreme ratings (`<= 2` or `>= 4`) divided by the total number of sessions, rounded to 2 decimal places.
- Only include books with a polarization score of at least 0.6.

Return the result table ordered by polarization score descending, then by title descending.

## Approach
Aggregate per book: total session count, maximum and minimum rating, and the count of "extreme" ratings (`<= 2` or `>= 4`). Filter to books with at least 5 sessions, a maximum rating of at least 4, a minimum rating of at most 2, and an extreme-rating ratio of at least 0.6, then join back to `books` for the descriptive columns and order as required.

## SQL Solution

```sql
WITH stats AS (
    SELECT
        book_id,
        COUNT(*) AS total_sessions,
        MAX(session_rating) AS max_rating,
        MIN(session_rating) AS min_rating,
        SUM(CASE WHEN session_rating <= 2 OR session_rating >= 4 THEN 1 ELSE 0 END) AS extreme_count
    FROM reading_sessions
    GROUP BY book_id
)
SELECT
    b.book_id,
    b.title,
    b.author,
    b.genre,
    b.pages,
    (s.max_rating - s.min_rating) AS rating_spread,
    ROUND(s.extreme_count / s.total_sessions, 2) AS polarization_score
FROM books b
JOIN stats s ON s.book_id = b.book_id
WHERE s.total_sessions >= 5
  AND s.max_rating >= 4
  AND s.min_rating <= 2
  AND (s.extreme_count / s.total_sessions) >= 0.6
ORDER BY polarization_score DESC, b.title DESC;
```

## Complexity

- **Time:** O(n), where n is the number of reading sessions.
- **Space:** O(n)
