# 2956. Count Complete Substrings

**Difficulty:** Medium
**Category:** Hash Table, String, Sliding Window

## Problem

A substring is complete if every character appears exactly `k` times in it. You are given a string `word` and an integer `k`.

Return the number of complete substrings in `word`.

### Example

```
Input: word = "ababcbacba", k = 2
Output: 5
Explanation: Complete substrings with k=2: "abab", "abcba", "bab", "cba", "bacb"
```

## Approach

For each unique character count from 1 to 26, compute the required window length (`uniqueChars * k`). Use a sliding window to count substrings where all present characters appear exactly `k` times.

## C# Solution

```csharp
public class Solution
{
    public int CountCompleteSubstrings(string word, int k)
    {
        int count = 0;
        int n = word.Length;

        for (int uniqueChars = 1; uniqueChars <= 26; uniqueChars++)
        {
            int windowSize = uniqueChars * k;
            if (windowSize > n) break;

            var freq = new Dictionary<char, int>();

            for (int i = 0; i < n; i++)
            {
                freq[word[i]] = freq.GetValueOrDefault(word[i], 0) + 1;

                if (i >= windowSize)
                {
                    char leftChar = word[i - windowSize];
                    freq[leftChar]--;
                    if (freq[leftChar] == 0) freq.Remove(leftChar);
                }

                if (i >= windowSize - 1)
                {
                    if (freq.Count == uniqueChars && freq.Values.All(v => v == k))
                    {
                        count++;
                    }
                }
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** O(26 * n) = O(n)
- **Space:** O(26) = O(1)
