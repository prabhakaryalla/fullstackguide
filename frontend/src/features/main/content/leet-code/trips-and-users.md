# 262. Trips and Users

**Difficulty:** Hard
**Category:** SQL, Database

## Problem

Given a `Trips` table (`id`, `client_id`, `driver_id`, `city_id`, `status`, `request_at`) and a `Users` table (`users_id`, `banned`, `role`), compute the cancellation rate of requests made by unbanned clients with unbanned drivers, per day, for a given date range, rounded to two decimal places.

### Schema

```
Trips: id (PK), client_id, driver_id, city_id, status ('completed' | 'cancelled_by_driver' | 'cancelled_by_client'), request_at
Users: users_id (PK), banned ('Yes' | 'No'), role ('client' | 'driver' | 'partner')
```

## Approach

Join `Trips` to `Users` twice (once for the client, once for the driver) to filter out any trip where either party is banned. Group the remaining trips by `request_at`, and for each day compute `COUNT(cancelled) / COUNT(total)`, formatted to two decimal places.

## SQL Solution

```sql
SELECT
    t.request_at AS Day,
    ROUND(
        SUM(CASE WHEN t.status <> 'completed' THEN 1 ELSE 0 END) / COUNT(*),
        2
    ) AS "Cancellation Rate"
FROM Trips t
JOIN Users c ON t.client_id = c.users_id AND c.banned = 'No'
JOIN Users d ON t.driver_id = d.users_id AND d.banned = 'No'
WHERE t.request_at BETWEEN '2013-10-01' AND '2013-10-03'
GROUP BY t.request_at;
```

## Complexity

- **Time:** `O(n)` — a single pass over the joined, filtered rows with aggregation.
- **Space:** `O(d)` — where `d` is the number of distinct days in the range.
