# 245. Shortest Word Distance III

**Difficulty:** Medium
**Category:** Array, Hash Table, String

## Problem

Given an array of strings `wordsDict` and two strings `word1` and `word2`, return the shortest distance between their indices. Unlike the original version, `word1` and `word2` may be the same string, in which case the answer is the shortest distance between two distinct occurrences.

### Example

```
Input: wordsDict = ["practice","makes","perfect","coding","makes"], word1 = "makes", word2 = "coding"
Output: 1
```

### Constraints

- `1 <= wordsDict.length <= 10^5`
- `word1` and `word2` both occur in `wordsDict` (possibly equal).

## Approach

Scan once, tracking the last index each of `word1` and `word2` was seen. When `word1 == word2`, treat every match as an occurrence of both — only update the minimum when a *second* occurrence has been seen so distances are never computed against the same index.

## C# Solution

```csharp
public class Solution
{
    public int ShortestWordDistance(string[] wordsDict, string word1, string word2)
    {
        int index1 = -1, index2 = -1;
        int minDistance = int.MaxValue;
        bool sameWord = word1 == word2;

        for (int i = 0; i < wordsDict.Length; i++)
        {
            if (wordsDict[i] == word1)
            {
                if (sameWord) index1 = index2;
                index2 = i;
            }
            else if (wordsDict[i] == word2)
            {
                index2 = i;
            }

            if (index1 != -1 && index2 != -1)
                minDistance = Math.Min(minDistance, Math.Abs(index1 - index2));
        }

        return minDistance;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the array.
- **Space:** `O(1)`.
