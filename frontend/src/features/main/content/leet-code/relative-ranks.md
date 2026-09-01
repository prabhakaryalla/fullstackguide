# 506. Relative Ranks

**Difficulty:** Easy
**Category:** Array, Sorting, Heap (Priority Queue)

## Problem

Given an integer array `score` of unique athlete scores, return an array `answer` where `answer[i]` is the rank of the `i`th athlete: `"Gold Medal"`, `"Silver Medal"`, and `"Bronze Medal"` for the top three, and the numeric rank (as a string) for the rest.

### Example

```
Input: score = [5,4,3,2,1]
Output: ["Gold Medal","Silver Medal","Bronze Medal","4","5"]
```

### Constraints

- `n == score.length`
- `1 <= n <= 10^4`
- `0 <= score[i] <= 10^6`
- All the values in `score` are unique.

## Approach

Sort the original indices by score descending, so the order in which indices appear directly gives the rank. Walk this sorted order, assigning medal names to the first three positions and the numeric rank (position + 1) to the rest, writing each result back to its original index.

## C# Solution

```csharp
public class Solution
{
    public string[] FindRelativeRanks(int[] score)
    {
        int n = score.Length;
        var indices = Enumerable.Range(0, n).ToArray();
        Array.Sort(indices, (a, b) => score[b].CompareTo(score[a]));

        var result = new string[n];
        var medals = new[] { "Gold Medal", "Silver Medal", "Bronze Medal" };

        for (int rank = 0; rank < n; rank++)
        {
            result[indices[rank]] = rank < 3 ? medals[rank] : (rank + 1).ToString();
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n log n)`.
- **Space:** `O(n)` for the index array and result.
