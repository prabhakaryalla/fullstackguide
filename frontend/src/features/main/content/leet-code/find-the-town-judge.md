# 997. Find the Town Judge

**Difficulty:** Easy
**Category:** Array, Hash Table, Graph

## Problem

In a town of `n` people, the *judge* trusts nobody but is trusted by everybody else. Given a list of `trust` pairs `[a, b]` meaning `a` trusts `b`, return the judge's label, or `-1` if no such person exists.

### Example

```
Input: n = 3, trust = [[1,3],[2,3]]
Output: 3
```

## Approach

Track each person's in-degree (number of people who trust them) and out-degree (number of people they trust). The judge is the unique person with in-degree `n - 1` and out-degree `0`.

## C# Solution

```csharp
public class Solution
{
    public int FindJudge(int n, int[][] trust)
    {
        var inDegree = new int[n + 1];
        var outDegree = new int[n + 1];

        foreach (var t in trust)
        {
            outDegree[t[0]]++;
            inDegree[t[1]]++;
        }

        for (int i = 1; i <= n; i++)
        {
            if (inDegree[i] == n - 1 && outDegree[i] == 0) return i;
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n + trust.Length)`.
- **Space:** `O(n)`.
