# 2085. Count Common Words With One Occurrence

**Difficulty:** Easy
**Category:** Array, Hash Table, String, Counting

## Problem

Given two string arrays `words1` and `words2`, return *the number of strings that appear exactly once in `words1` and also appear exactly once in `words2`*.

## Approach

Build a frequency map for each array. A word counts toward the answer if its frequency is exactly `1` in `words1`'s map **and** exactly `1` in `words2`'s map. Iterate over the keys of one map (e.g., `words1`'s) checking this condition against both maps.

## C# Solution

```csharp
public class Solution
{
    public int CountWords(string[] words1, string[] words2)
    {
        var count1 = new Dictionary<string, int>();
        foreach (var w in words1) count1[w] = count1.GetValueOrDefault(w) + 1;

        var count2 = new Dictionary<string, int>();
        foreach (var w in words2) count2[w] = count2.GetValueOrDefault(w) + 1;

        int result = 0;
        foreach (var (word, count) in count1)
        {
            if (count == 1 && count2.GetValueOrDefault(word) == 1)
                result++;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n + m)`.
- **Space:** `O(n + m)` for the two frequency maps.
