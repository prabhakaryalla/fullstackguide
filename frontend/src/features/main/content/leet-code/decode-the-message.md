# 2325. Decode the Message

**Difficulty:** Easy
**Category:** String, Hash Table

## Problem

You are given the strings `key` and `message`, which represent a cipher key and a secret message, respectively. The steps to decode `message` are as follows:

1. Use the first appearance of all 26 lowercase English letters in `key` as the order of the substitution table.
2. Align the substitution table with the regular English alphabet.
3. Each letter in `message` is then substituted using the table.
4. Spaces ' ' are transformed to spaces ' '.

Return the decoded message.

### Example

```
Input: key = "the quick brown fox jumps over the lazy dog", message = "vkbs bs t suepuv"
Output: "this is a secret"
```

## Approach

Build a substitution map by iterating through the key and mapping each unique letter to the corresponding alphabet letter in order. Then decode the message using this map.

## C# Solution

```csharp
public class Solution
{
    public string DecodeMessage(string key, string message)
    {
        var map = new Dictionary<char, char>();
        map[' '] = ' ';
        
        char current = 'a';
        foreach (char c in key)
        {
            if (c != ' ' && !map.ContainsKey(c))
            {
                map[c] = current;
                current++;
            }
        }
        
        var result = new StringBuilder();
        foreach (char c in message)
        {
            result.Append(map[c]);
        }
        
        return result.ToString();
    }
}
```

## Complexity

- **Time:** O(n + m) where n is key length, m is message length
- **Space:** O(1) since map has at most 27 entries
