# 2559. Count Vowel Strings in Ranges

**Difficulty:** Medium
**Category:** Array, String, Prefix Sum

## Problem

You are given a 0-indexed array of strings `words` and a 2D array of integers `queries`.

Each query `queries[i] = [l_i, r_i]` asks you to find the number of strings in `words` that:

- Start with a vowel, and
- End with a vowel

in the range `[l_i, r_i]` (inclusive).

Vowels are `'a'`, `'e'`, `'i'`, `'o'`, and `'u'`.

### Example

```
Input: words = ["aba","bcb","ece","aa","e"], queries = [[0,2],[1,4],[1,1]]
Output: [2,3,0]
Explanation:
Query [0,2]: "aba" and "ece" start and end with vowels
Query [1,4]: "ece", "aa", and "e" start and end with vowels
Query [1,1]: "bcb" doesn't start and end with vowels

Input: words = ["a","e","i"], queries = [[0,2],[0,1],[2,2]]
Output: [3,2,1]
```

## Approach

Use prefix sums to answer range queries efficiently:

1. Create a prefix sum array where `prefix[i]` = count of valid strings in `words[0...i-1]`
2. For each query `[l, r]`, the answer is `prefix[r+1] - prefix[l]`

A string is valid if both its first and last characters are vowels.

## C# Solution

```csharp
public class Solution
{
    public int[] VowelStrings(string[] words, int[][] queries)
    {
        var vowels = new HashSet<char> { 'a', 'e', 'i', 'o', 'u' };
        int n = words.Length;
        int[] prefix = new int[n + 1];
        
        for (int i = 0; i < n; i++)
        {
            bool isValid = vowels.Contains(words[i][0]) && 
                          vowels.Contains(words[i][words[i].Length - 1]);
            prefix[i + 1] = prefix[i] + (isValid ? 1 : 0);
        }
        
        int[] result = new int[queries.Length];
        for (int i = 0; i < queries.Length; i++)
        {
            int l = queries[i][0];
            int r = queries[i][1];
            result[i] = prefix[r + 1] - prefix[l];
        }
        
        return result;
    }
}
```

## Complexity

- **Time:** O(n + q) where n is the words length and q is the queries length
- **Space:** O(n) for the prefix array
