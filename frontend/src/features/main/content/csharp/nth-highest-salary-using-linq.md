# Find Nth Highest Salary Using LINQ

A classic interview problem: given a list of employees, find the Nth highest salary while correctly handling duplicate salary values.

## Quick Answer

Group or deduplicate salaries first, sort descending, then skip `N - 1` and take one.

```csharp
public static decimal? GetNthHighestSalary(IEnumerable<Employee> employees, int n)
{
    return employees
        .Select(e => e.Salary)
        .Distinct()
        .OrderByDescending(salary => salary)
        .Skip(n - 1)
        .FirstOrDefault();
}
```

## Why Distinct() Matters

If two employees share the top salary, naive `OrderByDescending().Skip(n - 1).First()` without `Distinct()` would count both as separate ranks, giving the wrong answer for the 2nd highest.

Example data:

```csharp
public record Employee(string Name, decimal Salary);

var employees = new List<Employee>
{
    new("Alice", 90000),
    new("Bob", 90000),   // duplicate of Alice
    new("Charlie", 85000),
    new("Dave", 80000),
};
```

Without `Distinct()`, `Skip(1).First()` on salaries `[90000, 90000, 85000, 80000]` returns `90000` (Bob's salary) as the "2nd highest" — which is wrong if duplicates should count as one rank. With `Distinct()`, the distinct list is `[90000, 85000, 80000]`, so the 2nd highest correctly resolves to `85000`.

## Full Example

```csharp
var employees = new List<Employee>
{
    new("Alice", 90000),
    new("Bob", 90000),
    new("Charlie", 85000),
    new("Dave", 80000),
};

decimal? second = GetNthHighestSalary(employees, 2); // 85000
decimal? third = GetNthHighestSalary(employees, 3);  // 80000
decimal? fifth = GetNthHighestSalary(employees, 5);  // null (not enough distinct salaries)
```

`FirstOrDefault()` returns `null` (via nullable `decimal?`) when `n` exceeds the number of distinct salaries, instead of throwing.

## Alternative: Using GroupBy for Dense Ranking

`GroupBy` is useful when you need to see which employees share a rank, not just the salary value:

```csharp
public static IEnumerable<Employee> GetEmployeesAtNthHighestSalary(
    IEnumerable<Employee> employees, int n)
{
    var rankedGroups = employees
        .GroupBy(e => e.Salary)
        .OrderByDescending(g => g.Key)
        .ToList();

    return n <= rankedGroups.Count
        ? rankedGroups[n - 1]
        : Enumerable.Empty<Employee>();
}
```

This returns both Alice and Bob for `n = 1` since they tie for the highest salary.

## Common Mistakes

- Forgetting `Distinct()`, which miscounts ties as separate ranks.
- Using `.First()` instead of `.FirstOrDefault()`, causing an exception when `n` is out of range.
- Sorting ascending and skipping from the wrong end, leading to off-by-one errors.
- Recomputing the full sorted list repeatedly in a loop instead of computing once and reusing it.

## Real-World Example

A payroll dashboard needs to highlight the "3rd highest paid employee per department" for a compensation review. Grouping by department first, then applying the same `Distinct().OrderByDescending().Skip().FirstOrDefault()` pattern per group, gives an efficient and correct per-department ranking without loading duplicate salary rows into the result.

## Summary

To find the Nth highest salary with LINQ: project the salary values, remove duplicates with `Distinct()`, sort descending, skip `N - 1`, and take the first result with `FirstOrDefault()` to avoid exceptions when `N` is out of range.
