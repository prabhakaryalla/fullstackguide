# 2186. Minimum Number of Steps to Make Two Strings Anagram II

**Difficulty:** Medium
**Category:** String, Hash Table, Counting

## Problem

You are given two strings `s` and `t`. In one step, you can append any character to either `s` or `t`.

Return the minimum number of steps to make `s` and `t` anagrams of each other. An anagram of a string is a string that contains the same characters with a different (or the same) ordering.

### Example

```
Input: s = "leetcode", t = "coats"
Output: 7
Explanation: 
- 2 steps to make t to "coatsee" adding "e" and "e".
- 5 steps to make s to "leetcodecoats" adding "c", "o", "a", "t", "s".
```

## Approach

To make two strings anagrams:
1. Count the frequency of each character in both strings
2. For each character, we need enough copies in both strings to match the maximum frequency
3. The answer is the sum of characters we need to add to each string

More specifically:
- For each character, let `freq1` be its frequency in `s` and `freq2` in `t`
- If `freq1 > freq2`, we need to add `freq1 - freq2` to `t`
- If `freq2 > freq1`, we need to add `freq2 - freq1` to `s`
- The total is the sum of all these differences

## C# Solution

```csharp
public class Solution
{
    public int MinSteps(string s, string t)
    {
        int[] freqS = new int[26];
        int[] freqT = new int[26];
        
        foreach (char c in s)
        {
            freqS[c - 'a']++;
        }
        
        foreach (char c in t)
        {
            freqT[c - 'a']++;
        }
        
        int steps = 0;
        for (int i = 0; i < 26; i++)
        {
            steps += Math.Abs(freqS[i] - freqT[i]);
        }
        
        return steps;
    }
}
```

## Complexity

- **Time:** O(n + m), where n and m are the lengths of strings s and t
- **Space:** O(1), constant space for frequency arrays
