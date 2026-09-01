# 692. Top K Frequent Words

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Trie, Sorting, Heap, Bucket Sort, Counting

## Problem

Given an array of strings `words` and an integer `k`, return the `k` most frequent strings, sorted by frequency descending, with ties broken by lexicographical order.

### Example

```
Input: words = ["i","love","leetcode","i","love","coding"], k = 2
Output: ["i","love"]
```

## Approach

Count the occurrences of every word in a dictionary. Sort the distinct words by descending frequency, breaking ties with ordinal string comparison, and take the first `k` results.

## C# Solution

```csharp
public class Solution
{
    public IList<string> TopKFrequent(string[] words, int k)
    {
        var counts = new Dictionary<string, int>();
        foreach (var word in words)
            counts[word] = counts.GetValueOrDefault(word) + 1;

        return counts
            .OrderByDescending(pair => pair.Value)
            .ThenBy(pair => pair.Key, StringComparer.Ordinal)
            .Take(k)
            .Select(pair => pair.Key)
            .ToList();
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the count map.
