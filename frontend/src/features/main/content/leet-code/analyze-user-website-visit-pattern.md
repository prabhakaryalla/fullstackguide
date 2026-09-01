# 1152. Analyze User Website Visit Pattern

**Difficulty:** Medium
**Category:** Array, Hash Table, Sorting

## Problem

Given parallel arrays `username`, `timestamp`, and `website` describing website visits, find the 3-website sequence (in chronological order, not necessarily contiguous, all distinct websites) that is visited by the largest number of users. Return the pattern as a list of three website names; break ties by choosing the lexicographically smallest sequence.

### Example

```
Input: username = ["joe","joe","joe","james","james","james","james","mary","mary","mary"],
       timestamp = [1,2,3,4,5,6,7,8,9,10],
       website = ["home","about","career","home","cart","maps","home","home","about","career"]
Output: ["home","about","career"]
```

## Approach

Group visits by user and sort each user's websites by timestamp. For each user, enumerate every 3-website subsequence (as an ordered tuple) and record that user in the set of users who visited that pattern (using a set per pattern avoids double-counting a user who has the pattern more than once). Finally, pick the pattern with the largest user count, breaking ties lexicographically.

## C# Solution

```csharp
public class Solution
{
    public IList<string> MostVisitedPattern(string[] username, int[] timestamp, string[] website)
    {
        int n = username.Length;
        var visits = new List<(string user, int time, string site)>();
        for (int i = 0; i < n; i++) visits.Add((username[i], timestamp[i], website[i]));

        var byUser = visits
            .GroupBy(v => v.user)
            .ToDictionary(g => g.Key, g => g.OrderBy(v => v.time).Select(v => v.site).ToList());

        var patternCount = new Dictionary<(string, string, string), HashSet<string>>();

        foreach (var (user, sites) in byUser)
        {
            var seen = new HashSet<(string, string, string)>();

            for (int i = 0; i < sites.Count; i++)
            {
                for (int j = i + 1; j < sites.Count; j++)
                {
                    for (int k = j + 1; k < sites.Count; k++)
                    {
                        var pattern = (sites[i], sites[j], sites[k]);
                        if (seen.Add(pattern))
                        {
                            if (!patternCount.TryGetValue(pattern, out var users))
                            {
                                users = new HashSet<string>();
                                patternCount[pattern] = users;
                            }
                            users.Add(user);
                        }
                    }
                }
            }
        }

        var best = patternCount
            .OrderByDescending(kv => kv.Value.Count)
            .ThenBy(kv => kv.Key.Item1)
            .ThenBy(kv => kv.Key.Item2)
            .ThenBy(kv => kv.Key.Item3)
            .First();

        return new List<string> { best.Key.Item1, best.Key.Item2, best.Key.Item3 };
    }
}
```

## Complexity

- **Time:** `O(sum of visits_per_user^3)` for generating all triples.
- **Space:** `O(sum of visits_per_user^3)` for the pattern map.
