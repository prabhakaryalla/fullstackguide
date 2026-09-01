# 767. Reorganize String

**Difficulty:** Medium
**Category:** String, Greedy, Sorting, Heap, Counting

## Problem

Given a string `s`, rearrange its characters so that no two adjacent characters are the same, and return any such rearrangement, or an empty string if impossible.

### Example

```
Input: s = "aab"
Output: "aba"
```

## Approach

Rearrangement is impossible only if the most frequent character occurs more than `ceil(n / 2)` times. Otherwise, use a max-heap keyed by remaining frequency: repeatedly take the two most frequent remaining letters, place one occurrence of each consecutively into the result, decrement their counts, and re-insert any that still have remaining occurrences. Always interleaving the two currently most frequent letters guarantees no two identical letters end up adjacent.

## C# Solution

```csharp
public class Solution
{
    public string ReorganizeString(string s)
    {
        var counts = new int[26];
        foreach (var c in s) counts[c - 'a']++;

        int maxCount = counts.Max();
        if (maxCount > (s.Length + 1) / 2) return "";

        var heap = new PriorityQueue<int, int>();
        for (int i = 0; i < 26; i++)
        {
            if (counts[i] > 0) heap.Enqueue(i, -counts[i]);
        }

        var result = new char[s.Length];
        int index = 0;

        while (heap.Count > 0)
        {
            var firstBatch = new List<(int Letter, int Count)>();
            int take = Math.Min(2, heap.Count);

            for (int i = 0; i < take; i++)
            {
                heap.TryDequeue(out var letter, out var negCount);
                firstBatch.Add((letter, -negCount));
            }

            foreach (var (letter, count) in firstBatch)
            {
                result[index++] = (char)('a' + letter);
                if (count - 1 > 0)
                    heap.Enqueue(letter, -(count - 1));
            }
        }

        return new string(result);
    }
}
```

## Complexity

- **Time:** `O(n log 26)`.
- **Space:** `O(26)` for the heap.
