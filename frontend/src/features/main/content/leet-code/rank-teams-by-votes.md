# 1366. Rank Teams by Votes

**Difficulty:** Medium
**Category:** Array, String, Sorting, Counting

## Problem

Given `votes`, a list of strings each ranking team letters by preference, return the teams sorted by overall ranking: teams with more first-place votes rank higher, ties broken by second-place votes, and so on, with alphabetical order as the final tiebreaker.

### Example

```
Input: votes = ["ABC","ACB","ABC","ACB","ACB"]
Output: "ACB"
```

## Approach

For each team letter, build a count array tracking how many times it appeared in each rank position across all votes. Sort the distinct letters using a comparator that prefers more votes at the first rank position, falling through to later positions on ties, and finally alphabetical order.

## C# Solution

```csharp
public class Solution
{
    public string RankTeams(string[] votes)
    {
        int numTeams = votes[0].Length;
        var counts = new Dictionary<char, int[]>();

        foreach (char c in votes[0]) counts[c] = new int[numTeams];

        foreach (var vote in votes)
        {
            for (int pos = 0; pos < vote.Length; pos++)
            {
                counts[vote[pos]][pos]++;
            }
        }

        var teams = counts.Keys.ToList();
        teams.Sort((a, b) =>
        {
            for (int i = 0; i < numTeams; i++)
            {
                if (counts[a][i] != counts[b][i]) return counts[b][i] - counts[a][i];
            }
            return a - b;
        });

        return new string(teams.ToArray());
    }
}
```

## Complexity

- **Time:** `O(n * m + m log m)` where `m` is the number of teams.
- **Space:** `O(m^2)` for the rank-count table.
