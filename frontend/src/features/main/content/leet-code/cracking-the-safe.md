# 753. Cracking the Safe

**Difficulty:** Hard
**Category:** Math, Depth-First Search, Graph

## Problem

A box requires entering a correct sequence of `n` digits (each `0` to `k-1`) as the last `n` digits typed to unlock. Return a string of minimum length containing every possible `n`-digit password (of digits `0` to `k-1`) as a substring.

### Example

```
Input: n = 1, k = 2
Output: "10"
```

## Approach

This is equivalent to finding a De Bruijn sequence: treat each string of length `n-1` as a node, and each digit `0..k-1` appended to a node as a directed edge to a new node, effectively representing an `n`-length password. Perform a greedy DFS with backtracking starting from `n` zeros, trying each unused edge (digit) from the current node; append the digit and recurse. Because every node has exactly `k` outgoing and `k` incoming edges, this Hierholzer-style greedy traversal is guaranteed to find an Eulerian circuit covering all `k^n` edges (passwords) when the total visited edge count equals `k^n`.

## C# Solution

```csharp
public class Solution
{
    public string CrackSafe(int n, int k)
    {
        var visited = new HashSet<string>();
        var result = new StringBuilder();

        string start = new string('0', n);
        result.Append(start);
        visited.Add(start);

        int totalNodes = (int)Math.Pow(k, n);

        Dfs(result, visited, n, k, totalNodes);

        return result.ToString();
    }

    private bool Dfs(StringBuilder result, HashSet<string> visited, int n, int k, int totalNodes)
    {
        if (visited.Count == totalNodes) return true;

        string node = result.ToString(result.Length - n + 1, n - 1);

        for (int digit = 0; digit < k; digit++)
        {
            string next = node + digit;

            if (!visited.Contains(next))
            {
                visited.Add(next);
                result.Append(digit);

                if (Dfs(result, visited, n, k, totalNodes)) return true;

                visited.Remove(next);
                result.Length--;
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(k^n)`.
- **Space:** `O(k^n)` for the visited set and result string.
