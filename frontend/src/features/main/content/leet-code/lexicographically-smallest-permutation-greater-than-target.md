# 3720. Lexicographically Smallest Permutation Greater Than Target

**Difficulty:** Medium
**Category:** Backtracking, Greedy, String

## Problem

You are given a string `target` and a multiset of characters described by `letters` (with the same length as `target`). Using every character in `letters` exactly once, construct the lexicographically smallest string that is strictly greater than `target`. Return that string, or an empty string if it is impossible.

### Example

target = "ab", letters = "ab" → the only permutation greater than "ab" formed from {a,b} is "ba".

## Approach

Try to keep the constructed string equal to `target` for as long a prefix as possible, then at the first position where we must exceed `target`, greedily pick the smallest available character strictly greater than `target[i]`, and fill the remaining positions with the leftover characters in ascending order. If no character is available to exceed `target[i]` while continuing an equal prefix, backtrack to an earlier position and try its next larger option.

## C# Solution

```csharp
public class Solution 
{
    public string SmallestGreaterPermutation(string target, string letters) 
    {
        int n = target.Length;
        int[] count = new int[26];
        foreach (char c in letters) count[c - 'a']++;

        char[] result = new char[n];
        if (Build(target, count, result, 0, false)) return new string(result);
        return "";
    }

    private bool Build(string target, int[] count, char[] result, int pos, bool alreadyGreater) 
    {
        if (pos == target.Length) return alreadyGreater;

        if (alreadyGreater) 
        {
            for (int c = 0; c < 26; c++) 
            {
                if (count[c] > 0) 
                {
                    result[pos] = (char)('a' + c);
                    count[c]--;
                    Build(target, count, result, pos + 1, true);
                    count[c]++;
                    return true;
                }
            }
            return false;
        }

        int need = target[pos] - 'a';
        if (count[need] > 0) 
        {
            count[need]--;
            result[pos] = target[pos];
            if (Build(target, count, result, pos + 1, false)) 
            {
                count[need]++;
                return true;
            }
            count[need]++;
        }

        for (int c = need + 1; c < 26; c++) 
        {
            if (count[c] > 0) 
            {
                count[c]--;
                result[pos] = (char)('a' + c);
                Build(target, count, result, pos + 1, true);
                count[c]++;
                return true;
            }
        }
        return false;
    }
}
```

## Complexity

- **Time:** O(n * 26)
- **Space:** O(n)
