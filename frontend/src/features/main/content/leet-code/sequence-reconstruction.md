# 444. Sequence Reconstruction

**Difficulty:** Medium
**Category:** Graph, Topological Sort, Array
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given an integer array `nums` (a permutation of `1` to `n`) and a list of `sequences`, return `true` if `nums` is the unique shortest common supersequence consistent with all the ordering constraints implied by `sequences`.

### Example

```
Input: nums = [1,2,3], sequences = [[1,2],[1,3]]
Output: false
```

### Constraints

- `1 <= n <= 10^4`
- `1 <= sequences.length <= 10^4`

## Approach

Build a directed graph where each sequence's consecutive pairs become edges, along with in-degree counts. Perform a topological sort (Kahn's algorithm): at every step, exactly one node must have in-degree zero available (multiple simultaneously available nodes mean the ordering isn't unique, so `nums` couldn't be the only valid reconstruction) and it must match the corresponding position in `nums`. The reconstruction is valid only if this holds at every step and the entire `nums` array is consumed.

## C# Solution

```csharp
public class Solution
{
    public bool SequenceReconstruction(int[] nums, IList<IList<int>> sequences)
    {
        int n = nums.Length;
        var graph = new Dictionary<int, HashSet<int>>();
        var inDegree = new Dictionary<int, int>();

        for (int i = 1; i <= n; i++)
        {
            graph[i] = new HashSet<int>();
            inDegree[i] = 0;
        }

        foreach (var seq in sequences)
        {
            for (int i = 0; i < seq.Count; i++)
            {
                if (seq[i] < 1 || seq[i] > n) return false;

                if (i > 0 && graph[seq[i - 1]].Add(seq[i]))
                    inDegree[seq[i]]++;
            }
        }

        var queue = new Queue<int>();
        foreach (var pair in inDegree)
            if (pair.Value == 0)
                queue.Enqueue(pair.Key);

        int index = 0;

        while (queue.Count > 0)
        {
            if (queue.Count > 1) return false;

            int current = queue.Dequeue();
            if (index >= n || nums[index] != current) return false;
            index++;

            foreach (var neighbor in graph[current])
            {
                inDegree[neighbor]--;
                if (inDegree[neighbor] == 0)
                    queue.Enqueue(neighbor);
            }
        }

        return index == n;
    }
}
```

## Complexity

- **Time:** `O(V + E)`.
- **Space:** `O(V + E)` for the graph.
