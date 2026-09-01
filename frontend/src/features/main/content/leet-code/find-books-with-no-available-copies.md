# 3570. Find Books with No Available Copies

**Difficulty:** Easy
**Category:** Database

## Problem
Table `library_books` has columns `book_id`, `title`, `author`, `genre`, `publication_year`, `total_copies`.

Table `borrowing_records` has columns `record_id`, `book_id`, `borrower_name`, `borrow_date`, `return_date`, where `return_date` is `NULL` if the book is currently borrowed and hasn't been returned.

Write a solution to find all books that are currently borrowed (have at least one record with a `NULL` `return_date`) and have zero copies available (i.e. the number of currently-borrowed copies equals `total_copies`).

Return the result table ordered by current borrowers in descending order, then by book title in ascending order.

### Example

```
Output:
| book_id | title            | author        | genre     | publication_year | current_borrowers |
| 1       | The Great Gatsby | F. Scott      | Fiction   | 1925              | 3                 |
| 3       | 1984             | George Orwell | Dystopian | 1949              | 1                 |
```

## Approach
Join `library_books` with `borrowing_records` filtered to `return_date IS NULL`, group by book, and count the current borrowers. Filter to books where the current-borrower count equals `total_copies` (no copies remain available), then order by borrower count descending, then title ascending.

## SQL Solution

```sql
SELECT 
    lb.book_id,
    lb.title,
    lb.author,
    lb.genre,
    lb.publication_year,
    COUNT(br.record_id) AS current_borrowers
FROM library_books lb
JOIN borrowing_records br 
    ON lb.book_id = br.book_id AND br.return_date IS NULL
GROUP BY lb.book_id, lb.title, lb.author, lb.genre, lb.publication_year, lb.total_copies
HAVING lb.total_copies - COUNT(br.record_id) = 0
ORDER BY current_borrowers DESC, lb.title ASC;
```

## Complexity

- **Time:** O(n log n), for the join, grouping, and final sort.
- **Space:** O(n), for the intermediate grouped rows.
