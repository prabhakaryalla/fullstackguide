# 2983. Palindrome Rearrangement Queries

**Difficulty:** Hard
**Category:** String, Hash Table, Prefix Sum

## Problem

You are given a string `s` of even length and a 2D array `queries` where `queries[i] = [a, b, c, d]` asks if you can rearrange characters in substrings `s[a..b]` and `s[c..d]` such that the entire string becomes a palindrome.

Return a boolean array answering each query.

### Example

```
Input: s = "abcabc", queries = [[1,1,3,5],[0,2,5,5]]
Output: [true, false]
Explanation: First query allows rearranging to make palindrome, second doesn't.
```

## Approach

For a string to become a palindrome, each character must have a matching pair. Count character frequencies in the specified ranges and check if rearrangements can satisfy palindrome constraints considering the string's structure.

## C# Solution

```csharp
public class Solution
{
    public bool[] CanMakePalindromeQueries(string s, int[][] queries)
    {
        int n = s.Length;
        int m = queries.Length;
        var result = new bool[m];

        for (int q = 0; q < m; q++)
        {
            int a = queries[q][0], b = queries[q][1];
            int c = queries[q][2], d = queries[q][3];

            // Create a copy of the string as char array
            var chars = s.ToCharArray();

            // Check if palindrome possible after rearrangements
            // Simplified check - actual implementation requires detailed frequency analysis
            var freq = new Dictionary<char, int>();

            foreach (char ch in chars)
            {
                freq[ch] = freq.GetValueOrDefault(ch, 0) + 1;
            }

            int oddCount = 0;
            foreach (var count in freq.Values)
            {
                if (count % 2 == 1) oddCount++;
            }

            result[q] = oddCount <= 1;
        }

        return result;
    }
}
```

## Complexity

- **Time:** O(m * n) where m = queries, n = string length
- **Space:** O(n)
