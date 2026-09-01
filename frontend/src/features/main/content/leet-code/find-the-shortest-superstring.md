# 943. Find the Shortest Superstring

**Difficulty:** Hard
**Category:** Array, String, Dynamic Programming, Bitmask

## Problem

Given an array of strings `words`, return the shortest string that contains every string in `words` as a substring. If multiple shortest strings exist, return any of them.

### Example

```
Input: words = ["alex","loves","leetcode"]
Output: "alexlovesleetcode"
```

## Approach

This is the "shortest common superstring" problem, solved as a bitmask Held-Karp DP over a directed graph where the edge weight between two words is the length of their maximum suffix-prefix overlap. `dp[mask][j]` tracks the maximum total overlap achievable visiting exactly the words in `mask`, ending at word `j`. After computing the DP, reconstruct the best visiting order via parent pointers and stitch the words together using their overlaps.

## C# Solution

```csharp
public class Solution
{
    public string ShortestSuperstring(string[] words)
    {
        int n = words.Length;
        var overlap = new int[n, n];

        for (int i = 0; i < n; i++)
        {
            for (int j = 0; j < n; j++)
            {
                if (i == j) continue;
                int maxLen = Math.Min(words[i].Length, words[j].Length);

                for (int k = maxLen; k > 0; k--)
                {
                    if (words[i].Substring(words[i].Length - k) == words[j].Substring(0, k))
                    {
                        overlap[i, j] = k;
                        break;
                    }
                }
            }
        }

        var dp = new int[1 << n, n];
        var parent = new int[1 << n, n];
        for (int mask = 0; mask < (1 << n); mask++)
            for (int j = 0; j < n; j++) parent[mask, j] = -1;

        for (int mask = 1; mask < (1 << n); mask++)
        {
            for (int j = 0; j < n; j++)
            {
                if ((mask & (1 << j)) == 0) continue;
                int prevMask = mask ^ (1 << j);
                if (prevMask == 0) continue;

                for (int k = 0; k < n; k++)
                {
                    if ((prevMask & (1 << k)) == 0) continue;
                    int val = dp[prevMask, k] + overlap[k, j];

                    if (val > dp[mask, j])
                    {
                        dp[mask, j] = val;
                        parent[mask, j] = k;
                    }
                }
            }
        }

        int fullMask = (1 << n) - 1, bestLast = 0, bestVal = -1;
        for (int j = 0; j < n; j++)
        {
            if (dp[fullMask, j] > bestVal)
            {
                bestVal = dp[fullMask, j];
                bestLast = j;
            }
        }

        var order = new List<int>();
        int curMask = fullMask, curNode = bestLast;
        while (curNode != -1)
        {
            order.Add(curNode);
            int prevNode = parent[curMask, curNode];
            curMask ^= (1 << curNode);
            curNode = prevNode;
        }
        order.Reverse();

        var sb = new StringBuilder(words[order[0]]);
        for (int i = 1; i < order.Count; i++)
        {
            int prev = order[i - 1], cur = order[i];
            sb.Append(words[cur].Substring(overlap[prev, cur]));
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(2^n * n^2)` for the DP, plus `O(n^2 * L)` to precompute overlaps.
- **Space:** `O(2^n * n)`.
