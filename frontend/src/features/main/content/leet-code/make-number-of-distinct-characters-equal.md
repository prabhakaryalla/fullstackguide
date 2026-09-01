# 2531. Make Number of Distinct Characters Equal

**Difficulty:** Medium
**Category:** Hash Table, String, Counting

## Problem

You are given two strings `word1` and `word2`. In one operation, you can pick any character in `word1` and change it to any other character. Return `true` if you can make the number of distinct characters in `word1` and `word2` equal with at most one operation, or `false` otherwise.

### Example

```
Input: word1 = "ac", word2 = "b"
Output: false
Explanation: No single character change can make the number of distinct characters equal.
```

## Approach

Without any operation, check if the counts already match. Then try swapping each character from word1 with each character from word2, recalculate distinct counts, and check if they become equal.

## C# Solution

```csharp
public class Solution
{
    public bool IsItPossible(string word1, string word2)
    {
        int[] freq1 = new int[26];
        int[] freq2 = new int[26];
        
        foreach (char c in word1) freq1[c - 'a']++;
        foreach (char c in word2) freq2[c - 'a']++;
        
        for (int i = 0; i < 26; i++)
        {
            if (freq1[i] == 0) continue;
            
            for (int j = 0; j < 26; j++)
            {
                if (freq2[j] == 0) continue;
                
                freq1[i]--;
                freq1[j]++;
                freq2[j]--;
                freq2[i]++;
                
                int count1 = 0, count2 = 0;
                for (int k = 0; k < 26; k++)
                {
                    if (freq1[k] > 0) count1++;
                    if (freq2[k] > 0) count2++;
                }
                
                if (count1 == count2) return true;
                
                freq1[i]++;
                freq1[j]--;
                freq2[j]++;
                freq2[i]--;
            }
        }
        
        return false;
    }
}
```

## Complexity

- **Time:** O(26 × 26 × 26) = O(1)
- **Space:** O(1)
