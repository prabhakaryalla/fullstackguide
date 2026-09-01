# 2884. Modify Columns

**Difficulty:** Easy
**Category:** Pandas, Data Analysis

## Problem
You are given a data set `employees` containing columns `name` and `salary`. Write a solution to modify the `salary` column in place by doubling every employee's salary.

## Approach
Pandas performs this with a vectorized in-place assignment: `employees['salary'] = employees['salary'] * 2`. Adapted to C#, iterate the rows of the `List<Dictionary<string, object>>` and overwrite the existing `"salary"` value with double its current value.

## C# Solution

```csharp
public class Solution 
{
    public List<Dictionary<string, object>> ModifySalaryColumn(List<Dictionary<string, object>> employees) 
    {
        foreach (var row in employees) 
        {
            row["salary"] = Convert.ToInt32(row["salary"]) * 2;
        }

        return employees;
    }
}
```

## Complexity

- **Time:** O(n), where n is the number of rows in `employees`.
- **Space:** O(1) additional space (the column is modified in place).
