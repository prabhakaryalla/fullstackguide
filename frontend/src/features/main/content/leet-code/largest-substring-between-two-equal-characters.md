# 1624. Largest Substring Between Two Equal Characters

**Difficulty:** Easy
**Category:** Hash Table, String

## Problem

Given a string `s`, return the length of the longest substring strictly between two equal characters (excluding both), or `-1` if no character repeats.

### Example

```
Input: s = "aa"
Output: 0
```

## Approach

Track the first-seen index of each of the 26 lowercase letters. When a letter is seen again, compute the gap `i - first[idx] - 1` and keep the maximum across all repeated letters.

## C# Solution

```csharp
public class Solution
{
    public int MaxLengthBetweenEqualCharacters(string s)
    {
        int[] first = new int[26];
        Array.Fill(first, -1);
        int best = -1;

        for (int i = 0; i < s.Length; i++)
        {
            int idx = s[i] - 'a';

            if (first[idx] == -1)
            {
                first[idx] = i;
            }
            else
            {
                best = Math.Max(best, i - first[idx] - 1);
            }
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` (fixed 26-slot array).
