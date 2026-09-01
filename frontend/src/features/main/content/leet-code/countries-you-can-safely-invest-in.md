# 1501. Countries You Can Safely Invest In

**Difficulty:** Medium
**Category:** Database

**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given tables `Person(id, name, phone_number)`, `Country(country_code, name)`, and `Calls(caller_id, callee_id, duration)` (where the first three digits of `phone_number` are the country code), find the names of countries whose average call duration is strictly greater than the global average call duration across all calls.

### Example

```
Input:
Person: (3, "Jonathan", "051-1234567"), (12, "Elvis", "051-7654321"),
        (1, "Moncef", "212-1234567"), (2, "Maroua", "212-6523651"),
        (7, "Meir", "972-1234567"), (9, "Rachel", "972-0011111")
Country: ("051", "Africa"), ("212", "Morocco"), ("972", "Israel")
Calls: (caller_id=3, callee_id=12, duration=200), (1,9,4), (2,9,000... )
Output: ["Africa"]
Explanation: Africa's average call duration is greater than the overall average.
```

## Approach

This is a SQL problem (no C# solution applies). Extract each person's country code as the first three characters of `phone_number`, join to `Country` to get the country name, then compute the average `duration` per country. Separately compute the overall average duration across all calls. Return the countries whose per-country average exceeds the global average.

```sql
SELECT co.name AS country
FROM Person p
JOIN Country co ON LEFT(p.phone_number, 3) = co.country_code
JOIN Calls c ON p.id = c.caller_id OR p.id = c.callee_id
GROUP BY co.name
HAVING AVG(c.duration) > (SELECT AVG(duration) FROM Calls);
```

## Complexity

- **Time:** `O(n)` — a single pass to group and aggregate call durations.
- **Space:** `O(n)` — for the grouped aggregates.
