# 854. K-Similar Strings

**Difficulty:** Hard
**Category:** Hash Table, String, Breadth-First Search

## Problem

Two anagram strings `s1` and `s2` are `k`-similar if `k` is the minimum number of swaps of two letters in `s1` needed to make it equal to `s2`. Given `s1` and `s2`, return `k`.

### Example

```
Input: s1 = "ab", s2 = "ba"
Output: 1
```

## Approach

Perform a BFS over strings reachable from `s1` via single swaps, looking for `s2`. To keep branching manageable, only generate neighbors that fix the *first* mismatched position: find the first index `i` where the current string differs from `s2`, then try swapping it with every later index `j` where `s[j]` equals the required character `s2[i]` (and `s[j]` isn't already correctly matching its own target position, to avoid undoing progress). This guarantees the search space grows manageably while still reaching the optimal answer.

## C# Solution

```csharp
public class Solution
{
    public int KSimilarity(string s1, string s2)
    {
        if (s1 == s2) return 0;

        var visited = new HashSet<string> { s1 };
        var queue = new Queue<string>();
        queue.Enqueue(s1);
        int steps = 0;

        while (queue.Count > 0)
        {
            steps++;
            int size = queue.Count;

            for (int i = 0; i < size; i++)
            {
                var current = queue.Dequeue();

                foreach (var next in GetNeighbors(current, s2))
                {
                    if (next == s2) return steps;

                    if (visited.Add(next))
                        queue.Enqueue(next);
                }
            }
        }

        return -1;
    }

    private List<string> GetNeighbors(string s, string target)
    {
        var neighbors = new List<string>();

        int i = 0;
        while (s[i] == target[i]) i++;

        var chars = s.ToCharArray();

        for (int j = i + 1; j < s.Length; j++)
        {
            if (s[j] == target[i] && s[j] != target[j])
            {
                (chars[i], chars[j]) = (chars[j], chars[i]);
                neighbors.Add(new string(chars));
                (chars[i], chars[j]) = (chars[j], chars[i]);
            }
        }

        return neighbors;
    }
}
```

## Complexity

- **Time:** Exponential in the worst case, bounded by the small practical string lengths in constraints.
- **Space:** `O(visited states)`.
