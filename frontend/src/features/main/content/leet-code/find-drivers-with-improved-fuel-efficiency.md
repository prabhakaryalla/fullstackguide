# 3601. Find Drivers with Improved Fuel Efficiency

**Difficulty:** Medium
**Category:** Database

## Problem
Table `Trips` holds one row per trip made by a driver:

| Column Name | Type  |
|-------------|-------|
| trip_id     | int   |
| driver_id   | int   |
| trip_year   | int   |
| distance    | float |
| fuel_used   | float |

`trip_id` is the primary key. Fuel efficiency for a trip is `distance / fuel_used`. Write a solution to find all `driver_id`s whose average fuel efficiency in `2023` is strictly greater than their average fuel efficiency in `2022`. A driver must have at least one trip in both years to be considered. Return the result ordered by `driver_id` in ascending order.

## Approach
Aggregate trips separately for each year of interest, computing each driver's average fuel efficiency (`AVG(distance / fuel_used)`) per year. Join the 2022 aggregate with the 2023 aggregate on `driver_id` (an inner join naturally enforces that the driver has trips in both years), then filter for drivers whose 2023 average exceeds their 2022 average. Finally order the results by `driver_id`.

## SQL Solution

```sql
SELECT y2022.driver_id
FROM (
    SELECT driver_id, AVG(distance / fuel_used) AS avg_efficiency
    FROM Trips
    WHERE trip_year = 2022
    GROUP BY driver_id
) AS y2022
JOIN (
    SELECT driver_id, AVG(distance / fuel_used) AS avg_efficiency
    FROM Trips
    WHERE trip_year = 2023
    GROUP BY driver_id
) AS y2023
ON y2022.driver_id = y2023.driver_id
WHERE y2023.avg_efficiency > y2022.avg_efficiency
ORDER BY y2022.driver_id;
```

## Complexity

- **Time:** O(n log n) for the aggregation and join, where n is the number of trips
- **Space:** O(d) where d is the number of distinct drivers
