# 1170. Compare Strings by Frequency of the Smallest Character

**Difficulty:** Medium
**Category:** Array, Hash Table, String, Sorting, Binary Search

## Problem

For a string `s`, define `f(s)` as the frequency of the lexicographically smallest character in `s`. Given `queries` and `words`, return an array where each element is the number of words `w` in `words` satisfying `f(w) > f(queries[i])`.

### Example

```
Input: queries = ["cbd"], words = ["zaaaz"]
Output: [1]
```

## Approach

Precompute `f(w)` for every word, sort those frequency values, and for each query, binary search for the position where its own `f(query)` value would be inserted (using an upper bound). The number of words strictly greater than that value is the array length minus that insertion position.

## C# Solution

```csharp
public class Solution
{
    public int[] NumSmallerByFrequency(string[] queries, string[] words)
    {
        int[] wordFreq = words.Select(F).OrderBy(x => x).ToArray();
        int[] result = new int[queries.Length];

        for (int i = 0; i < queries.Length; i++)
        {
            int queryFreq = F(queries[i]);
            result[i] = wordFreq.Length - UpperBound(wordFreq, queryFreq);
        }

        return result;
    }

    private int F(string s)
    {
        char smallest = s.Min();
        return s.Count(c => c == smallest);
    }

    private int UpperBound(int[] arr, int value)
    {
        int lo = 0, hi = arr.Length;
        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (arr[mid] <= value) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
```

## Complexity

- **Time:** `O((n + m) log n)`, where `n` is `words.Length` and `m` is `queries.Length`.
- **Space:** `O(n)` for the sorted frequency array.
