# 2168. Unique Substrings With Equal Digit Frequency

**Difficulty:** Medium
**Category:** Hash Table, String, Counting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a digit string, return the number of unique substrings where all digits (0-9) that appear in the substring appear with the same frequency.

### Example

```
Input: s = "1212"
Output: 5
Explanation: Unique substrings: "1", "2", "12", "21", "1212"
```

## Approach

For each substring, count the frequency of each digit. Check if all non-zero frequencies are equal. Use a hash set to track unique substrings that satisfy the condition.

The key is to use a frequency map for each substring and verify all present digits have equal count.

## C# Solution

```csharp
public class Solution
{
    public int EqualDigitFrequency(string s)
    {
        var uniqueSubstrings = new HashSet<string>();
        
        for (int i = 0; i < s.Length; i++)
        {
            var freq = new int[10];
            
            for (int j = i; j < s.Length; j++)
            {
                freq[s[j] - '0']++;
                
                if (IsEqualFrequency(freq))
                {
                    uniqueSubstrings.Add(s.Substring(i, j - i + 1));
                }
            }
        }
        
        return uniqueSubstrings.Count;
    }
    
    private bool IsEqualFrequency(int[] freq)
    {
        int targetFreq = -1;
        
        foreach (int f in freq)
        {
            if (f > 0)
            {
                if (targetFreq == -1)
                    targetFreq = f;
                else if (f != targetFreq)
                    return false;
            }
        }
        
        return true;
    }
}
```

## Complexity

- **Time:** O(n²) for generating all substrings
- **Space:** O(n²) for storing unique substrings
