# 2883. Drop Missing Data

**Difficulty:** Easy
**Category:** Pandas, Data Analysis

## Problem
You are given a data set `students` containing columns `student_id`, `name`, and `age`. Some rows have a missing (null) value in the `name` column. Write a solution to remove all rows that have missing data in the `name` column.

## Approach
Pandas provides `students.dropna(subset=['name'])` to drop rows where the specified column is null. Adapted to C#, the data set is a `List<Dictionary<string, object>>`; a row is dropped when its `"name"` value is `null` (or the key is missing), which is checked with `Where`.

## C# Solution

```csharp
public class Solution 
{
    public List<Dictionary<string, object>> DropMissingData(List<Dictionary<string, object>> students) 
    {
        return students
            .Where(row => row.TryGetValue("name", out var name) && name != null)
            .ToList();
    }
}
```

## Complexity

- **Time:** O(n), where n is the number of rows in `students`.
- **Space:** O(n) for the filtered result.
