# 2886. Change Data Type

**Difficulty:** Easy
**Category:** Pandas, Data Analysis

## Problem
You are given a data set `students` containing columns `student_id`, `name`, `age`, and `grade`, where `grade` is stored as a floating-point number (e.g. `85.0`) even though it always holds a whole number. Write a solution to convert the `grade` column to an integer type.

## Approach
Pandas performs this with `students['grade'] = students['grade'].astype(int)`. Adapted to C#, iterate the rows and replace the `"grade"` value with its integer-truncated equivalent.

## C# Solution

```csharp
public class Solution 
{
    public List<Dictionary<string, object>> ChangeDatatype(List<Dictionary<string, object>> students) 
    {
        foreach (var row in students) 
        {
            row["grade"] = (int)Convert.ToDouble(row["grade"]);
        }

        return students;
    }
}
```

## Complexity

- **Time:** O(n), where n is the number of rows in `students`.
- **Space:** O(1) additional space (the column is converted in place).
