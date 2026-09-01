# 1090. Largest Values From Labels

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting, Heap (Priority Queue)

## Problem

Given parallel arrays `values` and `labels`, choose a subset of at most `numWanted` items such that no more than `useLimit` items share the same label. Return the maximum possible sum of chosen values.

### Example

```
Input: values = [5,4,3,2,1], labels = [1,1,2,2,3], numWanted = 3, useLimit = 1
Output: 9
```

## Approach

Sort item indices by value in descending order, since higher-value items should always be preferred when eligible. Walk through this sorted order greedily: track how many items of each label have been picked so far, and pick an item only if its label hasn't hit `useLimit` yet, stopping once `numWanted` items have been chosen.

## C# Solution

```csharp
public class Solution
{
    public int LargestValsFromLabels(int[] values, int[] labels, int numWanted, int useLimit)
    {
        int n = values.Length;
        var indices = Enumerable.Range(0, n).ToArray();
        Array.Sort(indices, (a, b) => values[b].CompareTo(values[a]));

        var labelUsed = new Dictionary<int, int>();
        int total = 0;
        int picked = 0;

        foreach (var i in indices)
        {
            if (picked == numWanted) break;

            labelUsed.TryGetValue(labels[i], out var used);
            if (used >= useLimit) continue;

            total += values[i];
            labelUsed[labels[i]] = used + 1;
            picked++;
        }

        return total;
    }
}
```

## Complexity

- **Time:** `O(n log n)` for the sort.
- **Space:** `O(n)` for the index array and label-usage map.
