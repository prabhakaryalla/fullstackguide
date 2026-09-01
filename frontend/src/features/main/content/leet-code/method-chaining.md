# 2891. Method Chaining

**Difficulty:** Medium
**Category:** Pandas, Data Analysis

## Problem
You are given a data set `animals` containing columns `name`, `species`, `age`, and `weight`. Write a solution to select the animals that weigh strictly more than `100` (in kilograms), sort them by `weight` in descending order, and return only their `name` column.

## Approach
The original pandas solution chains three operations in a single expression: `animals[animals['weight'] > 100].sort_values(by='weight', ascending=False)[['name']]`. Adapted to C#, the same pipeline is expressed with LINQ: `Where` to filter, `OrderByDescending` to sort, then `Select` to project only the `name` column.

## C# Solution

```csharp
public class Solution 
{
    public List<Dictionary<string, object>> FindHeavyAnimals(List<Dictionary<string, object>> animals) 
    {
        return animals
            .Where(row => Convert.ToDouble(row["weight"]) > 100)
            .OrderByDescending(row => Convert.ToDouble(row["weight"]))
            .Select(row => new Dictionary<string, object> { ["name"] = row["name"] })
            .ToList();
    }
}
```

## Complexity

- **Time:** O(n log n), dominated by the sort.
- **Space:** O(n) for the filtered and sorted result.
