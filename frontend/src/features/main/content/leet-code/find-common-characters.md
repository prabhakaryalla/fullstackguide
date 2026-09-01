# 1002. Find Common Characters

**Difficulty:** Easy
**Category:** Array, Hash Table, String

## Problem

Given a string array `words`, return an array of all characters that show up in all strings within `words`, including duplicates. You may return the answer in any order.

### Example

```
Input: words = ["bella","label","roller"]
Output: ["e","l","l"]
```

## Approach

Maintain a 26-length "minimum count" array initialized to `int.MaxValue`. For each word, build its own 26-length letter-count array, then take the element-wise minimum with the running minimum. After processing all words, the minimum array holds how many times each letter appears in every word, so expand it back into the result list.

## C# Solution

```csharp
public class Solution
{
    public IList<string> CommonChars(string[] words)
    {
        int[] minCount = new int[26];
        Array.Fill(minCount, int.MaxValue);

        foreach (var word in words)
        {
            int[] count = new int[26];
            foreach (var ch in word) count[ch - 'a']++;
            for (int i = 0; i < 26; i++) minCount[i] = Math.Min(minCount[i], count[i]);
        }

        var result = new List<string>();
        for (int i = 0; i < 26; i++)
        {
            for (int j = 0; j < minCount[i]; j++)
                result.Add(((char)('a' + i)).ToString());
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(total characters)` across all words.
- **Space:** `O(1)` — fixed-size 26-element arrays.
