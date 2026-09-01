# 2417. Sum of Scores of Built Strings

**Difficulty:** Hard
**Category:** String, Binary Search, Rolling Hash, Suffix Array, Hash Function

## Problem

You are building a string `s` of length `n` one character at a time, prepending each new character to the front of the string. The strings are labeled from `1` to `n`, where the string with length `i` is labeled `s_i`.

The score of `s_i` is the length of the longest common prefix between `s_i` and `s_n` (the final string).

Return the sum of the scores of all `s_i`.

### Example

```
Input: s = "babab"
Output: 9
Explanation:
For s1 = "b": score = 1
For s2 = "ab": score = 0
For s3 = "bab": score = 1
For s4 = "abab": score = 0
For s5 = "babab": score = 5
Total = 1 + 0 + 1 + 0 + 5 = 7
Actually the problem builds from right to left, so:
s1 = "b": lcp with "babab" = 1
s2 = "ab": lcp with "babab" = 0
s3 = "bab": lcp with "babab" = 3
s4 = "abab": lcp with "babab" = 0
s5 = "babab": lcp with "babab" = 5
Total = 9
```

## Approach

Use Z-algorithm to compute the longest common prefix at each position efficiently. The Z-array gives us the length of the longest substring starting from position `i` that matches a prefix of the string.

## C# Solution

```csharp
public class Solution
{
    public long SumScores(string s)
    {
        int n = s.Length;
        int[] z = new int[n];
        z[0] = n;
        
        int left = 0, right = 0;
        for (int i = 1; i < n; i++)
        {
            if (i > right)
            {
                left = right = i;
                while (right < n && s[right] == s[right - left])
                {
                    right++;
                }
                z[i] = right - left;
                right--;
            }
            else
            {
                int k = i - left;
                if (z[k] < right - i + 1)
                {
                    z[i] = z[k];
                }
                else
                {
                    left = i;
                    while (right < n && s[right] == s[right - left])
                    {
                        right++;
                    }
                    z[i] = right - left;
                    right--;
                }
            }
        }
        
        long sum = 0;
        for (int i = 0; i < n; i++)
        {
            sum += z[i];
        }
        
        return sum;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the string
- **Space:** O(n) for the Z-array
