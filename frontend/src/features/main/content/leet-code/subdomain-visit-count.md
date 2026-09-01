# 811. Subdomain Visit Count

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Counting

## Problem

Given a list of "count-paired domains" like `"9001 discuss.leetcode.com"`, where the count represents visits to that exact domain, return the visit count for every domain and subdomain implied by the input (e.g., visiting `"discuss.leetcode.com"` also counts as a visit to `"leetcode.com"` and `"com"`).

### Example

```
Input: cpdomains = ["9001 discuss.leetcode.com"]
Output: ["9001 leetcode.com","9001 discuss.leetcode.com","9001 com"]
```

## Approach

For each entry, split off the visit count and the domain, then split the domain into its dot-separated labels. For every suffix of the label list (the full domain, then each progressively shorter parent domain), add the visit count to that subdomain's running total in a hash map. Finally, format each map entry back into the `"count domain"` string form.

## C# Solution

```csharp
public class Solution
{
    public IList<string> SubdomainVisits(string[] cpdomains)
    {
        var counts = new Dictionary<string, int>();

        foreach (var cpdomain in cpdomains)
        {
            var parts = cpdomain.Split(' ');
            int count = int.Parse(parts[0]);
            var domain = parts[1];

            var labels = domain.Split('.');

            for (int i = 0; i < labels.Length; i++)
            {
                var subdomain = string.Join(".", labels.Skip(i));
                counts[subdomain] = counts.GetValueOrDefault(subdomain) + count;
            }
        }

        return counts.Select(kvp => $"{kvp.Value} {kvp.Key}").ToList();
    }
}
```

## Complexity

- **Time:** `O(n * L)`, where `L` is the average domain length.
- **Space:** `O(n * L)` for the counts map.
