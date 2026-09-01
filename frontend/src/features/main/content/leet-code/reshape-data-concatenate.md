# 2888. Reshape Data: Concatenate

**Difficulty:** Easy
**Category:** Pandas, Data Analysis

## Problem
You are given two data sets, `df1` and `df2`, that share the exact same columns. Write a solution to concatenate them vertically into a single data set, with the rows of `df1` followed by the rows of `df2`.

## Approach
Pandas performs this with `pd.concat([df1, df2], ignore_index=True)`. Adapted to C#, since both inputs are `List<Dictionary<string, object>>` with identical schemas, simply append the second list's rows after the first list's rows.

## C# Solution

```csharp
public class Solution 
{
    public List<Dictionary<string, object>> ConcatenateTables(
        List<Dictionary<string, object>> df1,
        List<Dictionary<string, object>> df2) 
    {
        var result = new List<Dictionary<string, object>>(df1.Count + df2.Count);
        result.AddRange(df1);
        result.AddRange(df2);
        return result;
    }
}
```

## Complexity

- **Time:** O(n + m), where n and m are the row counts of `df1` and `df2`.
- **Space:** O(n + m) for the concatenated result.
