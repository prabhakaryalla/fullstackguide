# 3586. Find COVID Recovery Patients

**Difficulty:** Medium
**Category:** Database, Window Functions

## Problem
Table `CovidTests` has columns `patient_id`, `test_date`, and `result` (either `'Positive'` or `'Negative'`). A patient is considered **recovered** the first time a `Positive` test is followed, within 7 days, by a `Negative` test. Write a solution to return, for every patient who has such a recovery, the `patient_id`, the date of that earliest qualifying `Positive` test (`positive_date`), the date of the corresponding `Negative` test (`negative_date`), and the number of days between them (`days_to_recover`). Order the result by `patient_id`.

## Approach
For every `Positive` test, join against all `Negative` tests of the same patient that occur strictly later and within 7 days, keeping the earliest such negative date. Then, for each patient, keep only the earliest qualifying positive test (in case multiple positive tests each have a qualifying negative test) using `ROW_NUMBER`.

## SQL Solution
```sql
WITH Recoveries AS (
    SELECT
        p.patient_id,
        p.test_date AS positive_date,
        MIN(neg.test_date) AS negative_date
    FROM CovidTests p
    JOIN CovidTests neg
        ON p.patient_id = neg.patient_id
        AND neg.result = 'Negative'
        AND neg.test_date > p.test_date
        AND DATEDIFF(neg.test_date, p.test_date) <= 7
    WHERE p.result = 'Positive'
    GROUP BY p.patient_id, p.test_date
),
Ranked AS (
    SELECT
        patient_id,
        positive_date,
        negative_date,
        DATEDIFF(negative_date, positive_date) AS days_to_recover,
        ROW_NUMBER() OVER (PARTITION BY patient_id ORDER BY positive_date) AS rn
    FROM Recoveries
)
SELECT patient_id, positive_date, negative_date, days_to_recover
FROM Ranked
WHERE rn = 1
ORDER BY patient_id;
```

## Complexity
- **Time:** O(n²) in the worst case for the self-join, though indexes on `(patient_id, test_date)` make it efficient in practice.
- **Space:** O(n) for intermediate result sets.
