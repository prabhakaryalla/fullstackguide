# 2306. Naming a Company

**Difficulty:** Hard
**Category:** String, Hash Table, Bit Manipulation

## Problem

You are given an array of strings `ideas` that represents a list of names to be used in the process of naming a company. The process of naming a company is as follows:

1. Choose 2 distinct names from `ideas`, call them `idea_A` and `idea_B`.
2. Swap the first characters of `idea_A` and `idea_B` with each other.
3. If both of the new names are not found in the original `ideas`, then the name `idea_A idea_B` (the concatenation of `idea_A` and `idea_B`, separated by a space) is a valid company name.

Return the number of distinct valid names for the company.

### Example

```
Input: ideas = ["coffee","donuts","time","toffee"]
Output: 6
Explanation: Valid pairs: 
("coffee", "donuts") → "doffee conuts"
("coffee", "time") → "toffee cime"
("donuts", "coffee") → "conuts doffee"
etc.
```

## Approach

Group ideas by their first character. For each pair of groups with different starting characters, count how many suffixes are unique to each group (not present in the other). Multiply these counts and sum across all group pairs.

## C# Solution

```csharp
public class Solution
{
    public long DistinctNames(string[] ideas)
    {
        var groups = new Dictionary<char, HashSet<string>>();
        
        foreach (var idea in ideas)
        {
            char first = idea[0];
            string suffix = idea.Substring(1);
            if (!groups.ContainsKey(first))
                groups[first] = new HashSet<string>();
            groups[first].Add(suffix);
        }
        
        long result = 0;
        var keys = groups.Keys.ToList();
        
        for (int i = 0; i < keys.Count; i++)
        {
            for (int j = i + 1; j < keys.Count; j++)
            {
                char c1 = keys[i], c2 = keys[j];
                int common = groups[c1].Intersect(groups[c2]).Count();
                int unique1 = groups[c1].Count - common;
                int unique2 = groups[c2].Count - common;
                result += (long)unique1 * unique2 * 2;
            }
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n * m) where n is number of ideas, m is average length
- **Space:** O(n * m)
