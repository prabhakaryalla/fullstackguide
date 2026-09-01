# 2153. The Number of Passengers in Each Bus II

**Difficulty:** Hard
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Similar to problem 2142, but with more complex constraints involving multiple bus routes and transfer logic. Find the number of passengers on each bus considering transfers and capacity constraints.

### Schema

```sql
Buses table:
| bus_id | arrival_time | capacity |

Passengers table:
| passenger_id | arrival_time |
```

## Approach

Use window functions and self-joins to track:
1. Which bus each passenger boards
2. When passengers transfer between buses
3. Bus capacity constraints

Use running totals and window functions to calculate cumulative passenger counts.

## SQL Solution

```sql
WITH PassengerBus AS (
    SELECT 
        p.passenger_id,
        p.arrival_time,
        MIN(b.bus_id) as bus_id
    FROM Passengers p
    JOIN Buses b ON b.arrival_time >= p.arrival_time
    GROUP BY p.passenger_id, p.arrival_time
)
SELECT 
    b.bus_id,
    COUNT(pb.passenger_id) AS passengers_cnt
FROM Buses b
LEFT JOIN PassengerBus pb ON pb.bus_id = b.bus_id
GROUP BY b.bus_id
ORDER BY b.bus_id;
```

## Complexity

- **Time:** O(n * m) where n is buses and m is passengers
- **Space:** O(n + m) for intermediate results
