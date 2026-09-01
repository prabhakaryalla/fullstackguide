# 690. Employee Importance

**Difficulty:** Medium
**Category:** Hash Table, Tree, Depth-First Search, Breadth-First Search

## Problem

Given a list of employees, each with a unique `id`, an `importance` value, and a list of `subordinates` (ids of employees they directly manage), return the total importance value of an employee and all of their subordinates, given a starting `id`.

### Example

```
Input: employees = [[1,5,[2,3]],[2,3,[]],[3,3,[]]], id = 1
Output: 11
```

## Approach

Build a lookup from employee id to their record for O(1) access. Recursively sum an employee's own importance with the recursively-computed importance totals of each of their direct subordinates, which naturally accumulates the importance of the entire management subtree rooted at the given id.

## C# Solution

```csharp
public class Solution
{
    public int GetImportance(IList<Employee> employees, int id)
    {
        var employeeById = employees.ToDictionary(e => e.id);
        return Dfs(employeeById, id);
    }

    private int Dfs(Dictionary<int, Employee> employeeById, int id)
    {
        var employee = employeeById[id];
        int total = employee.importance;

        foreach (var subordinateId in employee.subordinates)
            total += Dfs(employeeById, subordinateId);

        return total;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the lookup map and recursion stack.
