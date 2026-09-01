# 1189. Maximum Number of Balloons

**Difficulty:** Easy
**Category:** Hash Table, String, Counting

## Problem

Given a string `text`, return the maximum number of times the word `"balloon"` can be formed using the letters of `text`, where each letter can only be used as many times as it appears.

### Example

```
Input: text = "nlaebolko"
Output: 1
```

## Approach

Count the occurrences of every letter in `text`. `"balloon"` requires one `b`, one `a`, two `l`s, two `o`s, and one `n`, so the number of times it can be assembled is limited by the scarcest resource: `min(count[b], count[a], count[l] / 2, count[o] / 2, count[n])`.

## C# Solution

```csharp
public class Solution
{
    public int MaxNumberOfBalloons(string text)
    {
        int[] count = new int[26];
        foreach (char c in text) count[c - 'a']++;

        int b = count['b' - 'a'];
        int a = count['a' - 'a'];
        int l = count['l' - 'a'] / 2;
        int o = count['o' - 'a'] / 2;
        int n = count['n' - 'a'];

        return new[] { b, a, l, o, n }.Min();
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
