# 2451. Odd String Difference

**Difficulty:** Easy
**Category:** Array, Hash Table, String

## Problem

You are given an array of equal-length strings `words`. The difference string of a word is an array where each element is the difference between consecutive characters (using ASCII values).

For example, the difference string of "acb" is [2, -1] because 'c' - 'a' = 2 and 'b' - 'c' = -1.

All strings except one have the same difference string. Return the string that has a different difference string.

### Example

```
Input: words = ["adc","wzy","abc"]
Output: "abc"
Explanation: 
"adc": [3, 1]
"wzy": [3, 1]
"abc": [1, 1]
"abc" is the odd one out.
```

## Approach

Calculate the difference string for each word. Use a hash map to count how many words have each difference pattern. The pattern that appears only once is the answer.

Alternatively, since only one word is different and we have at least 3 words, compare the first three words to determine which pattern is the odd one.

## C# Solution

```csharp
public class Solution
{
    public string OddString(string[] words)
    {
        var map = new Dictionary<string, List<string>>();
        
        foreach (string word in words)
        {
            string diff = GetDifference(word);
            if (!map.ContainsKey(diff))
            {
                map[diff] = new List<string>();
            }
            map[diff].Add(word);
        }
        
        foreach (var kvp in map)
        {
            if (kvp.Value.Count == 1)
            {
                return kvp.Value[0];
            }
        }
        
        return "";
    }
    
    private string GetDifference(string word)
    {
        var diffs = new int[word.Length - 1];
        for (int i = 0; i < word.Length - 1; i++)
        {
            diffs[i] = word[i + 1] - word[i];
        }
        return string.Join(",", diffs);
    }
}
```

## Complexity

- **Time:** O(n * m) where n is number of words and m is word length
- **Space:** O(n) for the hash map
