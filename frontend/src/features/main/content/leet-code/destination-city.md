# 1436. Destination City

**Difficulty:** Easy
**Category:** Array, Hash Table, String

## Problem

Given a list of `paths` where `paths[i] = [cityAi, cityBi]` represents a direct path from `cityAi` to `cityBi`, return the destination city — the one city with no outgoing path.

### Example

```
Input: paths = [["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]]
Output: "Sao Paulo"
```

## Approach

Collect every city that appears as a path's starting point into a hash set. The destination city is the one `cityB` value that never appears in that set of starting cities.

## C# Solution

```csharp
public class Solution
{
    public string DestCity(IList<IList<string>> paths)
    {
        var starts = new HashSet<string>(paths.Select(p => p[0]));

        foreach (var p in paths)
            if (!starts.Contains(p[1]))
                return p[1];

        return "";
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the set of starting cities.
