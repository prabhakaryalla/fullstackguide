# 2363. Merge Similar Items

**Difficulty:** Easy
**Category:** Array, Hash Table, Sorting

## Problem

You are given two 2D integer arrays, `items1` and `items2`, representing two sets of items. Each array `items` has the following properties:

- `items[i] = [value_i, weight_i]` where `value_i` represents the value and `weight_i` represents the weight of the `i-th` item.
- The value of each item in `items` is unique.

Return a 2D integer array `ret` where `ret[i] = [value_i, weight_i]`, with `weight_i` being the sum of weights of all items with value `value_i`.

Return `ret` in ascending order by value.

### Example

```
Input: items1 = [[1,1],[4,5],[3,8]], items2 = [[3,1],[1,5]]
Output: [[1,6],[3,9],[4,5]]
Explanation: Merge weights for matching values
```

## Approach

Use a dictionary to merge weights by value. Then convert to a sorted list of pairs.

## C# Solution

```csharp
public class Solution
{
    public IList<IList<int>> MergeSimilarItems(int[][] items1, int[][] items2)
    {
        var merged = new Dictionary<int, int>();
        
        foreach (var item in items1)
        {
            if (!merged.ContainsKey(item[0]))
                merged[item[0]] = 0;
            merged[item[0]] += item[1];
        }
        
        foreach (var item in items2)
        {
            if (!merged.ContainsKey(item[0]))
                merged[item[0]] = 0;
            merged[item[0]] += item[1];
        }
        
        var result = new List<IList<int>>();
        foreach (var kvp in merged.OrderBy(x => x.Key))
        {
            result.Add(new List<int> { kvp.Key, kvp.Value });
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O((n + m) log(n + m)) where n and m are array lengths
- **Space:** O(n + m)
