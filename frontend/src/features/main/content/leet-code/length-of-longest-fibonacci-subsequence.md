# 873. Length of Longest Fibonacci Subsequence

**Difficulty:** Medium
**Category:** Array, Hash Table, Dynamic Programming

## Problem

Given a strictly increasing array of positive integers `arr`, return the length of the longest Fibonacci-like subsequence (each element, from the third onward, equals the sum of the two preceding ones), or `0` if none exists of length 3 or more.

### Example

```
Input: arr = [1,2,3,4,5,6,7,8]
Output: 5
```

## Approach

Use DP indexed by pairs of positions: `dp[(j, k)]` represents the length of the longest Fibonacci-like subsequence ending with `arr[j]` followed by `arr[k]`. For every pair `(j, k)` with `j < k`, check whether `arr[k] - arr[j]` is a smaller earlier value present in the array at some index `i < j`; if so, extend the subsequence ending at `(i, j)` by one. A hash map from value to index enables O(1) lookup of the required earlier value.

## C# Solution

```csharp
public class Solution
{
    public int LenLongestFibSubseq(int[] arr)
    {
        int n = arr.Length;
        var indexOf = new Dictionary<int, int>();
        for (int i = 0; i < n; i++) indexOf[arr[i]] = i;

        var dp = new Dictionary<(int, int), int>();
        int best = 0;

        for (int j = 0; j < n; j++)
        {
            for (int k = j + 1; k < n; k++)
            {
                int prevValue = arr[k] - arr[j];

                if (prevValue < arr[j] && indexOf.TryGetValue(prevValue, out int i))
                {
                    int length = dp.GetValueOrDefault((i, j), 2) + 1;
                    dp[(j, k)] = length;
                    best = Math.Max(best, length);
                }
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)` for the DP map.
