# 2142. The Number of Passengers in Each Bus I

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Find the number of passengers that boarded each bus, ordered by bus arrival time. If no passengers boarded a bus, show 0 passengers.

### Schema

```sql
Buses table:
| bus_id | arrival_time |
Passengers table:
| passenger_id | arrival_time |
```

## Approach

For each bus, count how many passengers arrived at or before the bus arrival time but after the previous bus. Use window functions or a self-join to identify the previous bus for each passenger group.

## SQL Solution

```sql
SELECT 
    b.bus_id,
    COUNT(p.passenger_id) AS passengers_cnt
FROM Buses b
LEFT JOIN Passengers p ON p.arrival_time <= b.arrival_time
    AND p.arrival_time > COALESCE(
        (SELECT MAX(arrival_time) 
         FROM Buses 
         WHERE arrival_time < b.arrival_time), 
        0
    )
GROUP BY b.bus_id
ORDER BY b.bus_id;
```

## Complexity

- **Time:** O(n * m) where n is buses and m is passengers
- **Space:** O(1) for query processing
