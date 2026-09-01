# 599. Minimum Index Sum of Two Lists

**Difficulty:** Easy
**Category:** Array, Hash Table, String

## Problem

Given two string arrays `list1` and `list2` representing two people's favorite restaurants, return the common restaurants with the least index sum. If there are multiple answers, return all of them.

### Example

```
Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["Piatti","The Grill at Torrey Pines","Hungry Hunter Steakhouse","Shogun"]
Output: ["Shogun"]
```

### Constraints

- `1 <= list1.length, list2.length <= 1000`
- `1 <= list1[i].length, list2[i].length <= 30`

## Approach

Map each restaurant in `list1` to its index for `O(1)` lookups. Scan `list2`, and whenever a restaurant also appears in `list1`, compute the sum of both indices; track the minimum sum seen, resetting the result list whenever a smaller sum is found and appending ties at the current minimum.

## C# Solution

```csharp
public class Solution
{
    public string[] FindRestaurant(string[] list1, string[] list2)
    {
        var indexByRestaurant = new Dictionary<string, int>();
        for (int i = 0; i < list1.Length; i++)
            indexByRestaurant[list1[i]] = i;

        var result = new List<string>();
        int minSum = int.MaxValue;

        for (int j = 0; j < list2.Length; j++)
        {
            if (!indexByRestaurant.TryGetValue(list2[j], out var i)) continue;

            int sum = i + j;
            if (sum < minSum)
            {
                minSum = sum;
                result.Clear();
                result.Add(list2[j]);
            }
            else if (sum == minSum)
            {
                result.Add(list2[j]);
            }
        }

        return result.ToArray();
    }
}
```

## Complexity

- **Time:** `O(n + m)`.
- **Space:** `O(n)` for the index map.
