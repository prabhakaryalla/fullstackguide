# 3163. String Compression III

**Difficulty:** Medium
**Category:** String

## Problem
Given a string `word`, compress it using the following algorithm: repeatedly take the longest prefix of up to 9 consecutive identical characters, and replace it with the count followed by the character. Continue until the whole string has been processed. Return the resulting compressed string.

## Approach
Use two pointers to scan through the string, grouping consecutive equal characters, but cap each group at a maximum of 9 characters (since the count must be a single digit). For each group, append the count followed by the character to the result, then continue scanning from where the group ended.

## C# Solution
```csharp
public class Solution {
    public string CompressedString(string word) {
        int n = word.Length;
        var ans = new System.Text.StringBuilder();

        int i = 0;
        while (i < n) {
            int j = i;
            int count = 0;
            while (j < n && word[j] == word[i] && count < 9) {
                j++;
                count++;
            }
            ans.Append(count).Append(word[i]);
            i = j;
        }

        return ans.ToString();
    }
}
```

## Complexity
- Time: O(n)
- Space: O(n) for the result string
