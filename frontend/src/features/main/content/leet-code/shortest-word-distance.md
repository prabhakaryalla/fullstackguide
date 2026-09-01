# 243. Shortest Word Distance

**Difficulty:** Easy
**Category:** Array, String

## Problem

Given an array of strings `wordsDict` and two different strings `word1` and `word2` that both exist in the array, return the shortest distance between their indices.

### Example

```
Input: wordsDict = ["practice","makes","perfect","coding","makes"], word1 = "coding", word2 = "practice"
Output: 3
```

### Constraints

- `1 <= wordsDict.length <= 3 * 10^4`
- `word1 != word2` and both occur at least once in `wordsDict`.

## Approach

Scan the array once, tracking the most recent index at which `word1` and `word2` were each seen. Whenever the current word matches either target, update its last-seen index and, if the other target has already been seen, update the running minimum distance.

## C# Solution

```csharp
public class Solution
{
    public int ShortestDistance(string[] wordsDict, string word1, string word2)
    {
        int index1 = -1, index2 = -1;
        int minDistance = int.MaxValue;

        for (int i = 0; i < wordsDict.Length; i++)
        {
            if (wordsDict[i] == word1) index1 = i;
            else if (wordsDict[i] == word2) index2 = i;

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
