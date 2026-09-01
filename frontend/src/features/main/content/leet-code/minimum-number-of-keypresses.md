# 2268. Minimum Number of Keypresses

**Difficulty:** Medium
**Category:** Hash Table, String, Greedy, Sorting, Counting
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

Given a string `s`, remap the 26 English letters to a phone keypad with 9 keys (like old flip phones where multiple letters share a key). To type a letter, you press its key multiple times. Return the minimum total number of keypresses needed to type the entire string.

### Example

```
Input: s = "abcdefghijklmnopqrstuvwxyz"
Output: 65
Explanation: Assign most frequent letters to positions requiring fewer presses
```

## Approach

Count the frequency of each character. Sort by frequency in descending order. Assign the 9 most frequent characters to positions requiring 1 press each, the next 9 to positions requiring 2 presses, and the remaining 8 to positions requiring 3 presses.

## C# Solution

```csharp
public class Solution
{
    public int MinimumKeypresses(string s)
    {
        var freq = new int[26];
        foreach (char c in s)
        {
            freq[c - 'a']++;
        }
        
        Array.Sort(freq, (a, b) => b.CompareTo(a));
        
        int total = 0;
        for (int i = 0; i < 26; i++)
        {
            int presses = i / 9 + 1;
            total += freq[i] * presses;
        }
        
        return total;
    }
}
```

## Complexity

- **Time:** O(n + 26 log 26) = O(n)
- **Space:** O(1)
