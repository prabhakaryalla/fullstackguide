# 2887. Fill Missing Data

**Difficulty:** Easy
**Category:** Pandas, Data Analysis

## Problem
You are given a data set `products` containing columns `name`, `quantity`, and `price`. Some rows have a missing (null) value in the `quantity` column. Write a solution to fill every missing `quantity` value with `0`.

## Approach
Pandas performs this with `products['quantity'] = products['quantity'].fillna(0)`. Adapted to C#, iterate the rows and replace a `null` (or missing) `"quantity"` entry with `0`.

## C# Solution

```csharp
public class Solution 
{
    public List<Dictionary<string, object>> FillMissingValues(List<Dictionary<string, object>> products) 
    {
        foreach (var row in products) 
        {
            if (!row.TryGetValue("quantity", out var quantity) || quantity == null) 
            {
                row["quantity"] = 0;
            }
        }

        return products;
    }
}
```

## Complexity

- **Time:** O(n), where n is the number of rows in `products`.
- **Space:** O(1) additional space (missing values are filled in place).
