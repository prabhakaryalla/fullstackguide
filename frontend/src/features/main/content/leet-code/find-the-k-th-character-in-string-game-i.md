# 3304. Find the K-th Character in String Game I

**Difficulty:** Easy
**Category:** String, Simulation

## Problem

Alice is playing a game. Initially she has a string `word = "a"`.

She can perform one of the following operations any number of times:
- Generate a new string by changing every character in `word` to its next character in the alphabet (cyclically, so `'z'` becomes `'a'`), and append it to the original `word`. So `word` becomes `word + shift(word)`.

Given an integer `k`, return the k-th character (1-indexed) of `word` after `word` has been grown so that its length is at least `k`.

### Example

Input: `k = 5`

Starting with `word = "a"`:
- Operation 1: `word = "a" + "b" = "ab"`
- Operation 2: `word = "ab" + "bc" = "abbc"`
- Operation 3: `word = "abbc" + "bccd" = "abbcbccd"`

The 5th character of `"abbcbccd"` is `'b'`.

## Approach

Since the string at least doubles in length with every operation, and `k` is small, we can simply simulate: repeatedly append `word + shift(word)` until the length of `word` reaches at least `k`, then return the character at index `k - 1`.

## C# Solution

```csharp
public class Solution 
{
    public char KthCharacter(int k) 
    {
        var sb = new System.Text.StringBuilder("a");
        while (sb.Length < k)
        {
            int len = sb.Length;
            for (int i = 0; i < len; i++)
            {
                char c = sb[i];
                char next = c == 'z' ? 'a' : (char)(c + 1);
                sb.Append(next);
            }
        }
        return sb[k - 1];
    }
}
```

## Complexity

- **Time:** O(k) — the string length grows geometrically but total work to build up to length k is O(k).
- **Space:** O(k) for the resulting string.
