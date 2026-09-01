# 2418. Sort the People

**Difficulty:** Easy
**Category:** Array, Hash Table, String, Sorting

## Problem

You are given an array of strings `names`, and an array `heights` that consists of distinct positive integers. Both arrays are of length `n`.

For each index `i`, `names[i]` and `heights[i]` denote the name and height of the `i`-th person.

Return `names` sorted in descending order by the people's heights.

### Example

```
Input: names = ["Mary","John","Emma"], heights = [180,165,170]
Output: ["Mary","Emma","John"]
Explanation: Mary is the tallest, followed by Emma and John.
```

## Approach

Create pairs of (height, name), sort them by height in descending order, then extract the names.

## C# Solution

```csharp
public class Solution
{
    public string[] SortPeople(string[] names, int[] heights)
    {
        int n = names.Length;
        var people = new (int height, string name)[n];
        
        for (int i = 0; i < n; i++)
        {
            people[i] = (heights[i], names[i]);
        }
        
        Array.Sort(people, (a, b) => b.height.CompareTo(a.height));
        
        string[] result = new string[n];
        for (int i = 0; i < n; i++)
        {
            result[i] = people[i].name;
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n log n) for sorting
- **Space:** O(n) for the tuple array
