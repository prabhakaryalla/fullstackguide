# 433. Minimum Genetic Mutation

**Difficulty:** Medium
**Category:** Hash Table, String, Breadth-First Search

## Problem

Given a `startGene`, `endGene`, and an array `bank` of valid gene strings (each of length 8, over characters `A`, `C`, `G`, `T`), return the minimum number of single-character mutations needed to transform `startGene` into `endGene`, where every intermediate gene must exist in `bank`. Return `-1` if impossible.

### Example

```
Input: startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"]
Output: 1
```

### Constraints

- `0 <= bank.length <= 10`
- `startGene.length == endGene.length == bank[i].length == 8`
- All strings consist of only `'A'`, `'C'`, `'G'`, and `'T'`.

## Approach

Model each valid gene as a node in an implicit graph, where an edge connects two genes differing by exactly one character. Run a breadth-first search from `startGene`, generating all single-character mutations at each step and only exploring ones present in `bank`, tracking the mutation count level by level until `endGene` is reached.

## C# Solution

```csharp
public class Solution
{
    public int MinMutation(string startGene, string endGene, string[] bank)
    {
        var bankSet = new HashSet<string>(bank);
        if (!bankSet.Contains(endGene)) return -1;

        var genes = new[] { 'A', 'C', 'G', 'T' };
        var visited = new HashSet<string> { startGene };
        var queue = new Queue<string>();
        queue.Enqueue(startGene);
        int mutations = 0;

        while (queue.Count > 0)
        {
            int levelSize = queue.Count;
            for (int i = 0; i < levelSize; i++)
            {
                var current = queue.Dequeue();
                if (current == endGene) return mutations;

                var chars = current.ToCharArray();
                for (int pos = 0; pos < chars.Length; pos++)
                {
                    var original = chars[pos];
                    foreach (var gene in genes)
                    {
                        if (gene == original) continue;

                        chars[pos] = gene;
                        var candidate = new string(chars);

                        if (bankSet.Contains(candidate) && visited.Add(candidate))
                            queue.Enqueue(candidate);
                    }

                    chars[pos] = original;
                }
            }

            mutations++;
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(bank.Length * geneLength * 4)`.
- **Space:** `O(bank.Length)`.
