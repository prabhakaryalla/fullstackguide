# 266. Palindrome Permutation

**Difficulty:** Easy
**Category:** Hash Table, String, Bit Manipulation

## Problem

Given a string `s`, return `true` if a permutation of the string could form a palindrome.

### Example

```
Input: s = "code"
Output: false
```

## Approach

A string's characters can be rearranged into a palindrome if and only if at most one character has an odd frequency count (that character would sit in the middle for odd-length strings). Count character frequencies and check how many are odd.

## C# Solution

```csharp
public class Solution
{
    public bool CanPermutePalindrome(string s)
    {
        var counts = new Dictionary<char, int>();
        foreach (var c in s)
        {
            counts[c] = counts.GetValueOrDefault(c) + 1;
        }

        int oddCount = counts.Values.Count(count => count % 2 != 0);
        return oddCount <= 1;
    }
}
```

## Complexity

- **Time:** `O(n)` — one pass to count, one pass to check parity.
- **Space:** `O(k)` — where `k` is the number of distinct characters.
