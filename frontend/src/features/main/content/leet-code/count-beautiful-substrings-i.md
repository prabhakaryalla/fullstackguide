# 2947. Count Beautiful Substrings I

**Difficulty:** Medium
**Category:** String, Hash Table, Prefix Sum

## Problem

You are given a string `s` and an integer `k`. A substring is beautiful if the count of vowels equals the count of consonants, and their product is divisible by `k`. Return the count of beautiful substrings.

### Example

```
Input: s = "baeyh", k = 2
Output: 2
Explanation: "ae" (1 vowel, 1 consonant, 1*1=1, not divisible by 2). "baey" works.
```

## Approach

Use prefix sums to track vowel-consonant balance. For each substring, check if vowel count equals consonant count and if their product is divisible by k. Use a hash map to count occurrences of each balance state.

## C# Solution

```csharp
public class Solution 
{
    public int BeautifulSubstrings(string s, int k) 
    {
        int count = 0;
        var vowels = new HashSet<char> { 'a', 'e', 'i', 'o', 'u' };
        
        for (int i = 0; i < s.Length; i++) 
        {
            int vCount = 0, cCount = 0;
            
            for (int j = i; j < s.Length; j++) 
            {
                if (vowels.Contains(s[j])) vCount++;
                else cCount++;
                
                if (vCount == cCount && (vCount * cCount) % k == 0) 
                {
                    count++;
                }
            }
        }
        
        return count;
    }
}
```

## Complexity

- **Time:** O(n^2)
- **Space:** O(1)
