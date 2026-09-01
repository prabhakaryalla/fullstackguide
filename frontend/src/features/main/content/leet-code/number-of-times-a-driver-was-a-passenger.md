# 2238. Number of Times a Driver Was a Passenger

**Difficulty:** Easy
**Category:** Database

## SQL Problem

Write a SQL query to find the number of times each driver was a passenger.

### Schema

```
Rides table:
+----------+----------+----------+
| ride_id  | driver_id| passenger_id |
+----------+----------+----------+
```

### Example

```
Input:
Rides table:
+----------+----------+-------------+
| ride_id  | driver_id| passenger_id |
+----------+----------+-------------+
| 1        | 1        | 2           |
| 2        | 2        | 3           |
| 3        | 3        | 1           |
+----------+----------+-------------+

Output:
+----------+-----+
| driver_id| cnt |
+----------+-----+
| 1        | 1   |
| 2        | 0   |
| 3        | 0   |
+----------+-----+
```

## SQL Solution

```sql
SELECT DISTINCT d.driver_id,
       COUNT(p.ride_id) AS cnt
FROM (SELECT DISTINCT driver_id FROM Rides) d
LEFT JOIN Rides p ON d.driver_id = p.passenger_id
GROUP BY d.driver_id
```

## Complexity

- **Time:** O(n²) for join operation
- **Space:** O(n)
