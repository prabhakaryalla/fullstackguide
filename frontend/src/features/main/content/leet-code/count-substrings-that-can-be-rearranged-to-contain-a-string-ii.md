# 3298. Count Substrings That Can Be Rearranged to Contain a String II

**Difficulty:** Hard
**Category:** Hash Table, String, Sliding Window

## Problem

You are given two strings `word1` and `word2`. Return the number of substrings of `word1` such that the characters of the substring can be rearranged (permuted) to contain `word2` as a substring, i.e., the substring's character counts are greater than or equal to `word2`'s character counts for every letter. This version has larger input sizes than the "I" variant of the problem.

### Example

```
Input: word1 = "bcca", word2 = "abc"
Output: 1
```

## Approach

Use a sliding window with two pointers. Maintain the character-frequency requirements of `word2` and a running count of how many distinct required characters are currently satisfied (`window count >= need count`) as the right pointer advances. For each right endpoint, advance the left pointer as far as possible while the window still satisfies all requirements; once it no longer does, the last position where it was satisfied determines how many valid starting indices exist for the current right endpoint (all indices from `0` up to `left - 1`). Since both pointers only move forward, this runs in linear time, which comfortably handles the larger constraints of this version.

## C# Solution

```csharp
public class Solution 
{
    public long CountSubstrings(string word1, string word2) 
    {
        int[] need = new int[26];
        int required = 0;

        foreach (char c in word2) 
        {
            if (need[c - 'a'] == 0) required++;
            need[c - 'a']++;
        }

        int[] window = new int[26];
        int satisfied = 0;
        long answer = 0;
        int left = 0;
        int n = word1.Length;

        for (int right = 0; right < n; right++) 
        {
            int idxR = word1[right] - 'a';
            window[idxR]++;
            if (window[idxR] == need[idxR]) satisfied++;

            while (left <= right && satisfied == required) 
            {
                int idxL = word1[left] - 'a';
                window[idxL]--;
                if (window[idxL] == need[idxL] - 1) satisfied--;
                left++;
            }

            answer += left;
        }

        return answer;
    }
}
```

## Complexity

- **Time:** O(n + m) where n is the length of word1 and m is the length of word2
- **Space:** O(1) (fixed 26-letter alphabet)
