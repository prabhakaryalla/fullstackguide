# 1750. Minimum Length of String After Deleting Similar Ends

**Difficulty:** Medium
**Category:** Two Pointers, String, Greedy

## Problem

Given a string `s` consisting only of characters `'a'`, `'b'`, and `'c'`, repeatedly delete a non-empty prefix and a non-empty suffix that consist of the same single character (the prefix and suffix must not overlap). Return the minimum possible length of `s` after any number of such deletions.

### Example

```
Input: s = "ca"
Output: 2
```

## Approach

Use two pointers starting at both ends. While the characters at both pointers match, greedily consume every consecutive occurrence of that character from both the front and the back (since deleting more of the matching character is never worse), then repeat with the new ends. Stop when the pointers cross or the end characters differ.

## C# Solution

```csharp
public class Solution
{
    public int MinimumLength(string s)
    {
        int left = 0, right = s.Length - 1;

        while (left < right && s[left] == s[right])
        {
            char c = s[left];
            while (left <= right && s[left] == c) left++;
            while (right >= left && s[right] == c) right--;
        }

        return right - left + 1;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
