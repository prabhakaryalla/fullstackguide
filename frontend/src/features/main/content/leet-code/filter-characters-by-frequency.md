# 3662. Filter Characters by Frequency

**Difficulty:** Easy
**Category:** Hash Table, String, Counting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem
Given a string `s` and an integer `k`, return a string containing only the characters of `s` that occur at least `k` times in `s`, preserving their original relative order of first appearance (each qualifying character's occurrences are all kept, in their original positions relative to one another).

## Approach
Count the frequency of every character in `s` using a hash map (or a fixed-size array for lowercase letters). Then iterate through `s` once more, appending each character to the result only if its total frequency is greater than or equal to `k`. This preserves the original order and correctly includes every occurrence of a qualifying character.

## C# Solution

```csharp
public class Solution 
{
    public string FilterCharacters(string s, int k) 
    {
        var freq = new Dictionary<char, int>();
        foreach (var c in s)
        {
            freq[c] = freq.GetValueOrDefault(c, 0) + 1;
        }

        var sb = new System.Text.StringBuilder();
        foreach (var c in s)
        {
            if (freq[c] >= k)
            {
                sb.Append(c);
            }
        }

        return sb.ToString();
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of s
- **Space:** O(1) extra (bounded alphabet size) plus O(n) for the output
