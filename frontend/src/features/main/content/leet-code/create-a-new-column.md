# 2881. Create a New Column

**Difficulty:** Easy
**Category:** Pandas, Data Analysis

## Problem
You are given a data set `employees` containing columns `name` and `salary`. Write a solution to add a new column `bonus` that contains double the value of each employee's salary.

## Approach
In pandas this is a one-line vectorized assignment: `employees['bonus'] = employees['salary'] * 2`. Adapted to C#, the data set is a `List<Dictionary<string, object>>`; iterate the rows and add a new `"bonus"` key to each dictionary computed from the existing `"salary"` value.

## C# Solution

```csharp
public class Solution 
{
    public List<Dictionary<string, object>> CreateBonusColumn(List<Dictionary<string, object>> employees) 
    {
        foreach (var row in employees) 
        {
            row["bonus"] = Convert.ToInt32(row["salary"]) * 2;
        }

        return employees;
    }
}
```

## Complexity

- **Time:** O(n), where n is the number of rows in `employees`.
- **Space:** O(1) additional space (the new column is added in place).
