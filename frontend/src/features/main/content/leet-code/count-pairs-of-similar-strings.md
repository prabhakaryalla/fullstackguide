# 2506. Count Pairs Of Similar Strings

**Difficulty:** Easy
**Category:** Array, Hash Table, String

## Problem

You are given a 0-indexed string array `words`. Two strings are similar if they consist of the same characters. Return the number of pairs `(i, j)` such that `0 <= i < j < words.length` and the two strings `words[i]` and `words[j]` are similar.

### Example

```
Input: words = ["aba","aabb","abcd","bac","aabc"]
Output: 2
Explanation: There are 2 pairs: ("aba", "aabb") and ("aba", "bac") both have the same character set.
```

## Approach

For each word, create a signature representing the set of unique characters it contains. Use a hash map to count how many words share the same signature. For each group of size `count`, the number of pairs is `count * (count - 1) / 2`.

## C# Solution

```csharp
public class Solution
{
    public int SimilarPairs(string[] words)
    {
        Dictionary<string, int> signatureCount = new Dictionary<string, int>();
        
        foreach (string word in words)
        {
            HashSet<char> chars = new HashSet<char>(word);
            var sortedChars = chars.OrderBy(c => c);
            string signature = string.Join("", sortedChars);
            
            signatureCount[signature] = signatureCount.GetValueOrDefault(signature, 0) + 1;
        }
        
        int pairs = 0;
        foreach (int count in signatureCount.Values)
        {
            pairs += count * (count - 1) / 2;
        }
        
        return pairs;
    }
}
```

## Complexity

- **Time:** O(n × m × log(26)) where n is the number of words and m is average word length
- **Space:** O(n) for the hash map
