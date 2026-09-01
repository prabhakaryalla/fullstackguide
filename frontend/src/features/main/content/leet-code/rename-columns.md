# 2885. Rename Columns

**Difficulty:** Easy
**Category:** Pandas, Data Analysis

## Problem
You are given a data set `students` containing columns `id`, `first`, `last`, and `age`. Write a solution to rename the columns as follows: `id` to `student_id`, `first` to `first_name`, `last` to `last_name`, and `age` to `age_in_years`.

## Approach
Pandas renames columns with a dictionary mapping via `students.rename(columns={...})`. Adapted to C#, since each row is a `Dictionary<string, object>`, build a new dictionary per row that copies each value under its new key name.

## C# Solution

```csharp
public class Solution 
{
    public List<Dictionary<string, object>> RenameColumns(List<Dictionary<string, object>> students) 
    {
        var columnMap = new Dictionary<string, string> 
        {
            ["id"] = "student_id",
            ["first"] = "first_name",
            ["last"] = "last_name",
            ["age"] = "age_in_years"
        };

        return students
            .Select(row => 
            {
                var renamed = new Dictionary<string, object>();
                foreach (var pair in row) 
                {
                    string newName = columnMap.TryGetValue(pair.Key, out var mapped) ? mapped : pair.Key;
                    renamed[newName] = pair.Value;
                }
                return renamed;
            })
            .ToList();
    }
}
```

## Complexity

- **Time:** O(n * c), where n is the number of rows and c is the number of columns.
- **Space:** O(n * c) for the renamed copy.
