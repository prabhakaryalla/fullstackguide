# 1409. Queries on a Permutation With Key

**Difficulty:** Medium
**Category:** Array, Simulation

## Problem

Start with the permutation `P = [1, 2, ..., m]`. For each value in `queries`, find its current index in `P`, append that index to the answer, then move that value to the front of `P`. Return the array of recorded indices.

### Example

```
Input: queries = [3,1,2,1], m = 5
Output: [2,1,2,1]
```

## Approach

Simulate directly using a list representing the current permutation. For each query, locate the value's index, record it, remove it from its current position, and reinsert it at the front. Given the small constraints (`m, queries.length <= 1000`), this direct simulation is efficient enough.

## C# Solution

```csharp
public class Solution
{
    public int[] ProcessQueries(int[] queries, int m)
    {
        var perm = new List<int>(m);
        for (int i = 1; i <= m; i++) perm.Add(i);

        var result = new int[queries.Length];

        for (int i = 0; i < queries.Length; i++)
        {
            int idx = perm.IndexOf(queries[i]);
            result[i] = idx;
            perm.RemoveAt(idx);
            perm.Insert(0, queries[i]);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(q * m)` where `q` is the number of queries.
- **Space:** `O(m)` for the permutation list.
