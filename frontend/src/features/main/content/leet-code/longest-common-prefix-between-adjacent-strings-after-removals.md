# 3598. Longest Common Prefix Between Adjacent Strings After Removals

**Difficulty:** Hard
**Category:** Array, String, Prefix Sum

## Problem
Given an array of strings `words`, for each index `i`, consider the array formed by removing `words[i]`. Compute the length of the longest common prefix between any two adjacent strings in that resulting array (0 if the resulting array has fewer than 2 elements or no adjacent pair shares a common prefix). Return an array `answer` where `answer[i]` is this value for removing index `i`.

## Approach
Precompute `lcp[j]` = length of the common prefix between `words[j]` and `words[j + 1]` for every adjacent pair in the original array. Removing `words[i]` deletes the two pairs touching index `i` (pairs `i-1` and `i` in the `lcp` array) and, if both neighbors exist, introduces one new pair `(words[i-1], words[i+1])`.

Build prefix-max and suffix-max arrays over `lcp` so that the maximum value outside any two consecutive excluded indices can be retrieved in O(1). For each `i`, the answer is the maximum of:
- the prefix max up to index `i - 2`,
- the suffix max from index `i + 1`,
- the directly computed common prefix length of `words[i-1]` and `words[i+1]` (if both exist).

## C# Solution

```csharp
public class Solution 
{
    public int[] LongestCommonPrefix(string[] words) 
    {
        int n = words.Length;
        int[] result = new int[n];
        if (n <= 1)
            return result;

        int[] lcp = new int[n - 1];
        for (int j = 0; j < n - 1; j++)
            lcp[j] = CommonPrefixLength(words[j], words[j + 1]);

        int[] prefixMax = new int[n - 1];
        int[] suffixMax = new int[n - 1];

        prefixMax[0] = lcp[0];
        for (int j = 1; j < n - 1; j++)
            prefixMax[j] = Math.Max(prefixMax[j - 1], lcp[j]);

        suffixMax[n - 2] = lcp[n - 2];
        for (int j = n - 3; j >= 0; j--)
            suffixMax[j] = Math.Max(suffixMax[j + 1], lcp[j]);

        for (int i = 0; i < n; i++)
        {
            int best = 0;
            int leftBound = i - 2;
            int rightBound = i + 1;

            if (leftBound >= 0)
                best = Math.Max(best, prefixMax[leftBound]);
            if (rightBound <= n - 2)
                best = Math.Max(best, suffixMax[rightBound]);

            if (i - 1 >= 0 && i + 1 <= n - 1)
                best = Math.Max(best, CommonPrefixLength(words[i - 1], words[i + 1]));

            result[i] = best;
        }

        return result;
    }

    private int CommonPrefixLength(string a, string b)
    {
        int len = Math.Min(a.Length, b.Length);
        int k = 0;
        while (k < len && a[k] == b[k])
            k++;
        return k;
    }
}
```

## Complexity

- **Time:** O(n * L) where L is the average string length
- **Space:** O(n)
