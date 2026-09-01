# 2890. Reshape Data: Melt

**Difficulty:** Medium
**Category:** Pandas, Data Analysis

## Problem
You are given a data set `report` containing a `product` column and four quarterly sales columns: `quarter_1`, `quarter_2`, `quarter_3`, and `quarter_4`. Write a solution to reshape (melt/unpivot) the data so that each product-quarter combination becomes its own row, with columns `product`, `quarter`, and `sales`.

## Approach
Pandas performs this with `report.melt(id_vars=['product'], var_name='quarter', value_name='sales')`. Adapted to C#, iterate each input row and, for each of the four quarterly columns, emit a new row containing the `product`, the quarter's column name, and its sales value.

## C# Solution

```csharp
public class Solution 
{
    private static readonly string[] Quarters = { "quarter_1", "quarter_2", "quarter_3", "quarter_4" };

    public List<Dictionary<string, object>> MeltTable(List<Dictionary<string, object>> report) 
    {
        var result = new List<Dictionary<string, object>>();

        foreach (var row in report) 
        {
            foreach (var quarter in Quarters) 
            {
                result.Add(new Dictionary<string, object> 
                {
                    ["product"] = row["product"],
                    ["quarter"] = quarter,
                    ["sales"] = row[quarter]
                });
            }
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n), where n is the number of rows in `report` (each row expands into a constant 4 output rows).
- **Space:** O(n) for the melted result.
