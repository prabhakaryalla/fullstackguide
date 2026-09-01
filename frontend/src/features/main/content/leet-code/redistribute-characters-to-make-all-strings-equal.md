# 1897. Redistribute Characters to Make All Strings Equal

**Difficulty:** Easy
**Category:** Array, Hash Table, String, Counting

## Problem

Given an array of strings `words`, determine whether the characters across all strings can be redistributed so that every string becomes equal to each other.

### Example

```
Input: words = ["abc","aabc","bc"]
Output: true
```

## Approach

Count the total occurrences of each letter across all strings. Redistribution into equal strings is possible exactly when every letter's total count is evenly divisible by the number of strings (since each resulting equal string must receive the same share of every letter).

## C# Solution

```csharp
public class Solution
{
    public bool MakeEqual(string[] words)
    {
        var counts = new int[26];
        foreach (var word in words)
        {
            foreach (char c in word) counts[c - 'a']++;
        }

        int n = words.Length;
        return counts.All(count => count % n == 0);
    }
}
```

## Complexity

- **Time:** `O(total characters)`.
- **Space:** `O(1)` (fixed 26-letter counts).
