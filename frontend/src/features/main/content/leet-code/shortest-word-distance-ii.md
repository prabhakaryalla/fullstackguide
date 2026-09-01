# 244. Shortest Word Distance II

**Difficulty:** Medium
**Category:** Hash Table, String, Design

## Problem

Design a class that is initialized with an array of strings `wordsDict`, and supports repeated calls to find the shortest distance between two different words, where the same lookup may be called many times with different word pairs.

### Example

```
WordDistance(["practice","makes","perfect","coding","makes"])
Shortest("coding", "practice") -> 3
Shortest("makes", "coding") -> 1
```

### Constraints

- `1 <= wordsDict.length <= 3 * 10^4`
- The `shortest` method may be called up to `5000` times.

## Approach

Since queries repeat, precompute a map from each word to the sorted list of indices at which it occurs. For each query, merge-walk the two sorted index lists with two pointers, advancing whichever pointer points to the smaller index, tracking the minimum absolute difference seen — this avoids rescanning the whole array per query.

## C# Solution

```csharp
public class WordDistance
{
    private readonly Dictionary<string, List<int>> indices = new();

    public WordDistance(string[] wordsDict)
    {
        for (int i = 0; i < wordsDict.Length; i++)
        {
            if (!indices.TryGetValue(wordsDict[i], out var list))
                indices[wordsDict[i]] = list = new List<int>();
            list.Add(i);
        }
    }

    public int Shortest(string word1, string word2)
    {
        var list1 = indices[word1];
        var list2 = indices[word2];

        int i = 0, j = 0;
        int minDistance = int.MaxValue;

        while (i < list1.Count && j < list2.Count)
        {
            minDistance = Math.Min(minDistance, Math.Abs(list1[i] - list2[j]));
            if (list1[i] < list2[j]) i++;
            else j++;
        }

        return minDistance;
    }
}
```

## Complexity

- **Time:** `O(n)` for construction; `O(a + b)` per query, where `a` and `b` are occurrence counts of the two words.
- **Space:** `O(n)` — for the index map.
