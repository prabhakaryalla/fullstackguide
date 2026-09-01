# 2889. Reshape Data: Pivot

**Difficulty:** Medium
**Category:** Pandas, Data Analysis

## Problem
You are given a data set `weather` containing columns `city`, `month`, and `temperature`, where each row records the average temperature of a city for a given month. Write a solution to reshape (pivot) the data so that each row represents a distinct `month`, each column (other than the index) represents a distinct `city`, and each cell contains the corresponding `temperature`.

## Approach
Pandas performs this with `weather.pivot(index='month', columns='city', values='temperature')`. Adapted to C#, build a nested dictionary keyed first by `month` and then by `city`, so each `month` maps to a `Dictionary<string, object>` of `city -> temperature` pairs — mirroring a pivoted table.

## C# Solution

```csharp
public class Solution 
{
    public Dictionary<object, Dictionary<string, object>> PivotTable(List<Dictionary<string, object>> weather) 
    {
        var result = new Dictionary<object, Dictionary<string, object>>();

        foreach (var row in weather) 
        {
            object month = row["month"];
            string city = (string)row["city"];

            if (!result.TryGetValue(month, out var cities)) 
            {
                cities = new Dictionary<string, object>();
                result[month] = cities;
            }

            cities[city] = row["temperature"];
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(n), where n is the number of rows in `weather`.
- **Space:** O(n) for the pivoted structure.
