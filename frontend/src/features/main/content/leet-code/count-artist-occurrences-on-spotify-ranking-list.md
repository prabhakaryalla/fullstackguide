# 2669. Count Artist Occurrences On Spotify Ranking List

**Difficulty:** Easy
**Category:** Database

## Problem

Table: Spotify

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| track_name  | varchar |
| artist      | varchar |
+-------------+---------+
```

`id` is the primary key. Each row contains information about a track on the Spotify ranking list.

Write an SQL query to find the number of occurrences of each artist in the Spotify ranking list.

Return the result table having the artist's name and the corresponding number of occurrences ordered by occurrences in descending order. If occurrences are the same, order by artist in ascending order.

### Schema

```sql
CREATE TABLE Spotify (
    id INT PRIMARY KEY,
    track_name VARCHAR(200),
    artist VARCHAR(200)
);
```

### Example

```
Input:
Spotify table:
+----+-------------------+------------+
| id | track_name        | artist     |
+----+-------------------+------------+
| 1  | Shape of You      | Ed Sheeran |
| 2  | Perfect           | Ed Sheeran |
| 3  | Despacito         | Luis Fonsi |
| 4  | Rockstar          | Post Malone|
| 5  | Psycho            | Post Malone|
| 6  | I Like It         | Cardi B    |
+----+-------------------+------------+

Output:
+-------------+-------------+
| artist      | occurrences |
+-------------+-------------+
| Ed Sheeran  | 2           |
| Post Malone | 2           |
| Cardi B     | 1           |
| Luis Fonsi  | 1           |
+-------------+-------------+
```

## Approach

Group by artist and count the number of tracks for each, then order by count descending and artist name ascending.

## SQL Solution

```sql
SELECT 
    artist,
    COUNT(*) AS occurrences
FROM Spotify
GROUP BY artist
ORDER BY occurrences DESC, artist ASC;
```

## Complexity

- **Time:** O(n log n) for grouping and sorting
- **Space:** O(a) where a is the number of distinct artists
