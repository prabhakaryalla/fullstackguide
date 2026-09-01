# 1358. Number of Substrings Containing All Three Characters

**Difficulty:** Medium
**Category:** Hash Table, String, Sliding Window

## Problem

Given a string `s` consisting only of `'a'`, `'b'`, and `'c'`, return the number of substrings containing at least one occurrence of all three characters.

### Example

```
Input: s = "abcabc"
Output: 10
```

## Approach

Track the most recent index at which each of `'a'`, `'b'`, and `'c'` was seen while scanning left to right. For every ending position, once all three characters have appeared at least once, every substring starting anywhere from index `0` up to the earliest of the three last-seen indices also contains all three characters, so add `1 + min(lastA, lastB, lastC)` to the running count.

## C# Solution

```csharp
public class Solution
{
    public int NumberOfSubstrings(string s)
    {
        var last = new int[3] { -1, -1, -1 };
        long count = 0;

        for (int i = 0; i < s.Length; i++)
        {
            last[s[i] - 'a'] = i;

            if (last[0] != -1 && last[1] != -1 && last[2] != -1)
            {
                count += 1 + Math.Min(last[0], Math.Min(last[1], last[2]));
            }
        }

        return (int)count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
