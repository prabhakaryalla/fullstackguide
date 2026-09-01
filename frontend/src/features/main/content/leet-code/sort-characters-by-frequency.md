# 451. Sort Characters By Frequency

**Difficulty:** Medium
**Category:** Hash Table, String, Sorting, Heap, Bucket Sort, Counting

## Problem

Given a string `s`, sort it in decreasing order based on the frequency of characters, and return the sorted string. If multiple characters have the same frequency, any order among them is acceptable.

### Example

```
Input: s = "tree"
Output: "eert"
```

### Constraints

- `1 <= s.length <= 5 * 10^5`
- `s` consists of uppercase and lowercase English letters and digits.

## Approach

Count occurrences of each character, then bucket characters by their frequency (frequency is bounded by the string length, making bucket sort a natural fit). Build the result by scanning buckets from the highest frequency down, appending each character repeated its frequency number of times.

## C# Solution

```csharp
public class Solution
{
    public string FrequencySort(string s)
    {
        var counts = new Dictionary<char, int>();
        foreach (var c in s)
            counts[c] = counts.GetValueOrDefault(c) + 1;

        var buckets = new List<char>[s.Length + 1];
        foreach (var pair in counts)
            (buckets[pair.Value] ??= new List<char>()).Add(pair.Key);

        var sb = new StringBuilder();
        for (int freq = buckets.Length - 1; freq >= 0; freq--)
        {
            if (buckets[freq] == null) continue;

            foreach (var c in buckets[freq])
                sb.Append(new string(c, freq));
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** `O(n)` — counting and bucket placement are linear.
- **Space:** `O(n)` for the counts, buckets, and result.
