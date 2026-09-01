# 2053. Kth Distinct String in an Array

**Difficulty:** Easy
**Category:** Array, Hash Table, String, Counting

## Problem

A string is called **distinct** if it occurs exactly once in an array. Given an array of strings `arr` and an integer `k`, return *the `k`th distinct string present in `arr`, preserving original order*. If there are fewer than `k` distinct strings, return an empty string `""`.

## Approach

Count the occurrences of every string in `arr` using a hash map. Then scan `arr` in order, skipping any string whose count is not exactly `1`; the `k`th such string encountered is the answer. If the scan finishes without finding `k` distinct strings, return an empty string.

## C# Solution

```csharp
public class Solution
{
    public string KthDistinct(string[] arr, int k)
    {
        var counts = new Dictionary<string, int>();
        foreach (var s in arr)
            counts[s] = counts.GetValueOrDefault(s) + 1;

        int seen = 0;
        foreach (var s in arr)
        {
            if (counts[s] == 1)
            {
                seen++;
                if (seen == k) return s;
            }
        }

        return "";
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the frequency map.
