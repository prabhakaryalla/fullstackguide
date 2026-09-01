# 2880. Select Data

**Difficulty:** Easy
**Category:** Pandas, Data Analysis

## Problem
You are given a data set `students` containing columns `student_id`, `name`, and `age`. Write a solution to select the `name` and `age` for the student whose `student_id` is `101`.

## Approach
The pandas original filters the DataFrame with a boolean mask (`students['student_id'] == 101`) and then projects the `name` and `age` columns. Adapted to C#, the data set is a `List<Dictionary<string, object>>`; `Where` performs the row filter and a projection builds a new dictionary with only the requested columns.

## C# Solution

```csharp
public class Solution 
{
    public List<Dictionary<string, object>> SelectData(List<Dictionary<string, object>> students) 
    {
        return students
            .Where(row => Convert.ToInt32(row["student_id"]) == 101)
            .Select(row => new Dictionary<string, object> 
            {
                ["name"] = row["name"],
                ["age"] = row["age"]
            })
            .ToList();
    }
}
```

## Complexity

- **Time:** O(n), where n is the number of rows in `students`.
- **Space:** O(1) — at most one matching row is returned.
