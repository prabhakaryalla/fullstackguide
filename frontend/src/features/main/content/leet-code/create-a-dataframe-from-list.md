# 2877. Create a Dataframe from List

**Difficulty:** Easy
**Category:** Pandas

## Problem
Given a 2D list `studentData` where each inner list is `[student_id, age]`, create and return a table with exactly two columns, `"student_id"` and `"age"`, populated from `studentData` in order.

### Example
```
Input: studentData = [[1, 15], [2, 11], [3, 11], [4, 20]]
Output:
student_id | age
1          | 15
2          | 11
3          | 11
4          | 20
```

## Approach
Adapted from the original pandas-based study-plan problem, which builds a `pandas.DataFrame` directly from a list of lists with explicit column names. Since C# has no built-in `DataFrame` type, a `List<Dictionary<string, object>>` is used to represent the table, with one dictionary per row keyed by column name.

## C# Solution

```csharp
public class Solution
{
    public static List<Dictionary<string, object>> CreateDataframe(int[][] studentData)
    {
        var df = new List<Dictionary<string, object>>();

        foreach (var row in studentData)
        {
            df.Add(new Dictionary<string, object>
            {
                ["student_id"] = row[0],
                ["age"] = row[1]
            });
        }

        return df;
    }
}
```

## Complexity

- **Time:** O(n) where n is the number of rows.
- **Space:** O(n).
