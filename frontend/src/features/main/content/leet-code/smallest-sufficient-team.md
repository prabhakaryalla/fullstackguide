# 1125. Smallest Sufficient Team

**Difficulty:** Hard
**Category:** Array, Dynamic Programming, Bit Manipulation

## Problem

Given a list of `req_skills` and a list of `people`, where `people[i]` is the list of skills person `i` has, return the smallest team of people (as a list of indices) whose combined skills cover every required skill.

### Example

```
Input: req_skills = ["java","nodejs","reactjs"], people = [["java"],["nodejs"],["nodejs","reactjs"]]
Output: [0,2]
```

## Approach

Encode each required skill as a bit and represent each person as a bitmask of the skills they possess. Run a bitmask DP where `dp[mask]` stores the smallest list of people whose combined skills equal `mask`. Iterate over people, and for every existing mask, compute the new mask formed by adding that person's skills; keep whichever team is smaller. The answer is `dp[fullMask]`, where `fullMask` has every skill bit set.

## C# Solution

```csharp
public class Solution
{
    public int[] SmallestSufficientTeam(string[] req_skills, IList<IList<string>> people)
    {
        int m = req_skills.Length;
        var skillIndex = new Dictionary<string, int>();
        for (int i = 0; i < m; i++) skillIndex[req_skills[i]] = i;

        int n = people.Count;
        int[] personMask = new int[n];
        for (int i = 0; i < n; i++)
        {
            foreach (var skill in people[i])
            {
                if (skillIndex.TryGetValue(skill, out int bit))
                    personMask[i] |= 1 << bit;
            }
        }

        int full = 1 << m;
        var dp = new List<int>[full];
        dp[0] = new List<int>();

        for (int i = 0; i < n; i++)
        {
            for (int mask = 0; mask < full; mask++)
            {
                if (dp[mask] == null) continue;
                int newMask = mask | personMask[i];
                if (newMask == mask) continue;

                if (dp[newMask] == null || dp[newMask].Count > dp[mask].Count + 1)
                {
                    var team = new List<int>(dp[mask]) { i };
                    dp[newMask] = team;
                }
            }
        }

        return dp[full - 1].ToArray();
    }
}
```

## Complexity

- **Time:** `O(n · 2^m)`, where `m` is the number of required skills.
- **Space:** `O(2^m)` for the DP table.
