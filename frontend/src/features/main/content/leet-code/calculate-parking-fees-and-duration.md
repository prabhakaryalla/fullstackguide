# 3166. Calculate Parking Fees and Duration

**Difficulty:** Medium
**Category:** Database
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
A parking system logs each car's parking transactions, recording the car, the parking lot used, the entry time, exit time, and fee paid for that transaction. For each car, compute: the total fee paid across all transactions, the average hourly fee (total fee divided by total parked hours), and the id of the lot where the car spent the most total time.

### Schema
```sql
Create table If Not Exists ParkingTransactions (transaction_id int, car_id int, lot_id int, entry_time datetime, exit_time datetime, fee_paid decimal(10,2))
```

## Approach
Aggregate per car: sum the fee paid and sum the total parked duration across all of its transactions. Separately, aggregate per (car, lot) pair to find the duration parked in each lot, then determine which lot has the maximum duration for each car. Join these aggregates together, compute the average hourly fee as `total_fee * 60 / total_duration_minutes`, rounded to 2 decimal places, and output the car id, total fee paid, average hourly fee, and the lot with the most time spent.

## SQL Solution
```sql
WITH
  Cars AS (
    SELECT
      car_id,
      SUM(fee_paid) AS total_fee_paid,
      SUM(TIMESTAMPDIFF(MINUTE, entry_time, exit_time)) AS total_duration
    FROM ParkingTransactions
    GROUP BY car_id
  ),
  CarToDurationPerLot AS (
    SELECT
      car_id,
      lot_id,
      SUM(TIMESTAMPDIFF(MINUTE, entry_time, exit_time)) AS duration_per_lot
    FROM ParkingTransactions
    GROUP BY car_id, lot_id
  ),
  CarToMaxDurationPerLot AS (
    SELECT
      car_id,
      MAX(duration_per_lot) AS max_duration_per_lot
    FROM CarToDurationPerLot
    GROUP BY car_id
  )
SELECT
  Cars.car_id,
  Cars.total_fee_paid,
  ROUND(Cars.total_fee_paid * 60 / Cars.total_duration, 2) AS avg_hourly_fee,
  CarToDurationPerLot.lot_id AS most_time_lot
FROM Cars
INNER JOIN CarToDurationPerLot
  ON Cars.car_id = CarToDurationPerLot.car_id
INNER JOIN CarToMaxDurationPerLot
  ON Cars.car_id = CarToMaxDurationPerLot.car_id
WHERE
  CarToDurationPerLot.duration_per_lot = CarToMaxDurationPerLot.max_duration_per_lot
ORDER BY Cars.car_id;
```

## Complexity
- Time: O(n log n) due to grouping and joins
- Space: O(n)
