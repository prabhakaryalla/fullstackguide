# 2394. Employees With Deductions

**Difficulty:** Hard
**Category:** Database, Array, Hash Table, Sorting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
A company tracks employee attendance with two tables:
- `Employees(employee_id, needed_hours)`: the minimum number of hours each employee must work to avoid a pay deduction.
- `Logs(employee_id, in_time, out_time)`: individual clock-in/clock-out sessions (in minutes) for each employee; an employee may have multiple, possibly overlapping, sessions.

For each employee, compute:
1. `hours_worked` — the total distinct minutes actually worked (overlapping sessions must be merged so overlapping time is not double-counted), converted to hours by rounding **up** to the nearest integer.
2. `pay` — if `hours_worked < needed_hours`, the employee receives a deduction and is paid `0`. Otherwise, they are paid `$20` per hour for the first 20 hours worked, plus `$30` per hour for every hour beyond 20.

Return one row per employee, ordered by `employee_id`.

## Approach
Since this is adapted from a SQL problem into C#, model the two tables as in-memory collections. For each employee:
1. Filter and sort their log sessions by `in_time`.
2. Sweep through the sorted sessions merging any overlapping (or touching) intervals, accumulating the total merged minutes.
3. Convert minutes to hours using `Math.Ceiling(minutes / 60.0)`.
4. Apply the deduction/tiered-pay rule to compute the amount owed.

## C# Solution

```csharp
public class Solution
{
    public List<(int EmployeeId, int HoursWorked, int Pay)> EmployeesWithDeductions(
        List<(int EmployeeId, int NeededHours)> employees,
        List<(int EmployeeId, int InTime, int OutTime)> logs)
    {
        var logsByEmployee = logs
            .GroupBy(l => l.EmployeeId)
            .ToDictionary(g => g.Key, g => g.OrderBy(l => l.InTime).ToList());

        var result = new List<(int, int, int)>();

        foreach (var (employeeId, neededHours) in employees.OrderBy(e => e.EmployeeId))
        {
            int minutesWorked = 0;

            if (logsByEmployee.TryGetValue(employeeId, out var sessions) && sessions.Count > 0)
            {
                int curStart = sessions[0].InTime;
                int curEnd = sessions[0].OutTime;

                for (int i = 1; i < sessions.Count; i++)
                {
                    var (_, inTime, outTime) = sessions[i];
                    if (inTime <= curEnd)
                    {
                        curEnd = Math.Max(curEnd, outTime);
                    }
                    else
                    {
                        minutesWorked += curEnd - curStart;
                        curStart = inTime;
                        curEnd = outTime;
                    }
                }

                minutesWorked += curEnd - curStart;
            }

            int hoursWorked = (int)Math.Ceiling(minutesWorked / 60.0);
            int pay = hoursWorked < neededHours
                ? 0
                : Math.Min(hoursWorked, 20) * 20 + Math.Max(hoursWorked - 20, 0) * 30;

            result.Add((employeeId, hoursWorked, pay));
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n log n), dominated by sorting each employee's sessions.
- **Space:** O(n) to group and store the sessions per employee.
