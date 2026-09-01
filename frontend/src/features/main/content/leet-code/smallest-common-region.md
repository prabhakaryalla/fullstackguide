# 1257. Smallest Common Region

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Tree, Depth-First Search
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a list of regions, where each entry lists a parent region followed by all of its direct child regions (forming a tree of containment), return the smallest region that contains both `region1` and `region2`.

### Example

```
Input: regions = [["Earth","North America","South America"],
                   ["North America","United States","Canada"],
                   ["United States","New York","Boston"]],
       region1 = "New York", region2 = "Boston"
Output: "United States"
```

## Approach

This is a lowest-common-ancestor problem on the containment tree. Build a child-to-parent map from the input. Walk up from `region1` to the root, recording every ancestor (including itself) in a set. Then walk up from `region2` one step at a time until hitting a region that's already in that ancestor set — that first common region is the smallest one containing both.

## C# Solution

```csharp
public class Solution
{
    public string FindSmallestRegion(IList<IList<string>> regions, string region1, string region2)
    {
        var parent = new Dictionary<string, string>();

        foreach (var region in regions)
            for (int i = 1; i < region.Count; i++)
                parent[region[i]] = region[0];

        var ancestors = new HashSet<string>();
        string current = region1;
        while (current != null)
        {
            ancestors.Add(current);
            parent.TryGetValue(current, out current);
        }

        current = region2;
        while (!ancestors.Contains(current))
            current = parent[current];

        return current;
    }
}
```

## Complexity

- **Time:** `O(n)`, where `n` is the total number of regions.
- **Space:** `O(n)` for the parent map and ancestor set.
