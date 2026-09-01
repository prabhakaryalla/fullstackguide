# 1418. Display Table of Food Orders in a Restaurant

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Sorting

## Problem

Given `orders`, where each entry is `[customerName, tableNumber, foodItem]`, build a display table: the header row is `["Table", food1, food2, ...]` with food names sorted alphabetically, and each subsequent row (one per table, sorted numerically) lists the table number followed by the count of each food item ordered at that table.

### Example

```
Input: orders = [["David","3","Ceviche"],["Corina","10","Beef Burrito"],["David","3","Fried Chicken"],["Carla","5","Water"],["Carla","5","Ceviche"],["Rous","3","Ceviche"]]
Output: [["Table","Beef Burrito","Ceviche","Fried Chicken","Water"],["3","0","2","1","0"],["5","0","1","0","1"],["10","1","0","0","0"]]
```

## Approach

Use a sorted set to collect distinct food names (for the header) and a sorted map keyed by table number, each holding a food-to-count dictionary. After processing every order, build the header row from the sorted food names, then emit one row per table (in numeric order) with the counts for each food (`0` if that table never ordered it).

## C# Solution

```csharp
public class Solution
{
    public IList<IList<string>> DisplayTable(IList<IList<string>> orders)
    {
        var foodNames = new SortedSet<string>(StringComparer.Ordinal);
        var tables = new SortedDictionary<int, Dictionary<string, int>>();

        foreach (var order in orders)
        {
            string food = order[2];
            int table = int.Parse(order[1]);

            foodNames.Add(food);

            if (!tables.TryGetValue(table, out var counts))
            {
                counts = new Dictionary<string, int>();
                tables[table] = counts;
            }

            counts[food] = counts.GetValueOrDefault(food) + 1;
        }

        var foodList = foodNames.ToList();
        var result = new List<IList<string>>();

        var header = new List<string> { "Table" };
        header.AddRange(foodList);
        result.Add(header);

        foreach (var (table, counts) in tables)
        {
            var row = new List<string> { table.ToString() };
            foreach (var food in foodList)
                row.Add(counts.GetValueOrDefault(food).ToString());
            result.Add(row);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n + t * f)` where `n` is the number of orders, `t` the number of tables, and `f` the number of distinct foods.
- **Space:** `O(t * f)` for the table/food count map.
