# 1733. Minimum Number of People to Teach

**Difficulty:** Medium
**Category:** Array, Greedy, Hash Table

## Problem

There are `n` languages numbered `1..n`. Given `languages[i]` (the set of languages the `ith` user speaks) and `friendships` (pairs of users who are friends), a friendship is "problematic" if the two users share no common language. You may teach one single language to any set of users. Return the minimum number of users you must teach so that every friendship pair shares a language.

### Example

```
Input: n = 2, languages = [[1],[2],[1,2]], friendships = [[1,2],[1,3],[2,3]]
Output: 1
```

## Approach

Find every user involved in at least one problematic friendship — only these users may need teaching. Among those users, count how many already speak each language; teaching the single most popular language among them covers the most people, so the answer is the number of users needing help minus the maximum coverage of any one language.

## C# Solution

```csharp
public class Solution
{
    public int MinimumTeachings(int n, int[][] languages, int[][] friendships)
    {
        var langSets = new HashSet<int>[languages.Length + 1];
        for (int i = 0; i < languages.Length; i++)
            langSets[i + 1] = new HashSet<int>(languages[i]);

        bool CanCommunicate(int u, int v) => langSets[u].Overlaps(langSets[v]);

        var needTeaching = new HashSet<int>();
        foreach (var f in friendships)
        {
            int u = f[0], v = f[1];
            if (!CanCommunicate(u, v))
            {
                needTeaching.Add(u);
                needTeaching.Add(v);
            }
        }

        if (needTeaching.Count == 0) return 0;

        int[] langCount = new int[n + 1];
        foreach (int u in needTeaching)
            foreach (int lang in langSets[u])
                langCount[lang]++;

        int maxCovered = langCount.Max();
        return needTeaching.Count - maxCovered;
    }
}
```

## Complexity

- **Time:** `O((friendships + users) * languagesPerUser)`.
- **Space:** `O(users * languagesPerUser)`.
