# 269. Alien Dictionary

**Difficulty:** Hard
**Category:** Array, String, Topological Sort, Graph

## Problem

There is a new alien language that uses the English alphabet, but the order among the letters is unknown. Given a list of `words` sorted lexicographically according to the alien language's rules, derive one valid ordering of the letters, or determine that no valid ordering exists.

### Example

```
Input: words = ["wrt","wrf","er","ett","rftt"]
Output: "wertf"
```

### Constraints

- `1 <= words.length <= 100`
- `words[i]` consists of lowercase English letters.

## Approach

Compare each pair of adjacent words to find the first differing character — that pair reveals a "comes before" edge between two letters (e.g. `t` before `f`). Build a directed graph of these ordering constraints, then perform a topological sort (via BFS/Kahn's algorithm using in-degree counts) over all letters that appear in the input. If a cycle is detected (not all letters can be placed), or if a word is a proper prefix of an earlier word out of order (which is invalid), return an empty string.

## C# Solution

```csharp
public class Solution
{
    public string AlienOrder(string[] words)
    {
        var graph = new Dictionary<char, HashSet<char>>();
        var inDegree = new Dictionary<char, int>();

        foreach (var word in words)
        {
            foreach (var c in word)
            {
                graph.TryAdd(c, new HashSet<char>());
                inDegree.TryAdd(c, 0);
            }
        }

        for (int i = 0; i < words.Length - 1; i++)
        {
            var first = words[i];
            var second = words[i + 1];
            int minLength = Math.Min(first.Length, second.Length);
            bool foundDifference = false;

            for (int j = 0; j < minLength; j++)
            {
                if (first[j] != second[j])
                {
                    if (graph[first[j]].Add(second[j]))
                        inDegree[second[j]]++;
                    foundDifference = true;
                    break;
                }
            }

            if (!foundDifference && first.Length > second.Length) return "";
        }

        var queue = new Queue<char>(inDegree.Where(kvp => kvp.Value == 0).Select(kvp => kvp.Key));
        var order = new StringBuilder();

        while (queue.Count > 0)
        {
            var c = queue.Dequeue();
            order.Append(c);

            foreach (var next in graph[c])
            {
                if (--inDegree[next] == 0) queue.Enqueue(next);
            }
        }

        return order.Length == inDegree.Count ? order.ToString() : "";
    }
}
```

## Complexity

- **Time:** `O(C)` — where `C` is the total length of all words, dominating the edge construction; the topological sort itself is `O(V + E)`.
- **Space:** `O(1)` for the graph — bounded by the 26-letter alphabet.
