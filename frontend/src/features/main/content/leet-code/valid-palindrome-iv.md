# 2330. Valid Palindrome IV

**Difficulty:** Medium
**Category:** String, Two Pointers
**Note:** This is a LeetCode premium (subscriber-only) problem.

## Problem

You are given a 0-indexed string `s` consisting of only lowercase English letters. In one operation, you can change any character of `s` to any other character.

Return `true` if you can make `s` a palindrome after performing exactly one or two operations, or `false` otherwise.

### Example

```
Input: s = "abcdba"
Output: true
Explanation: One way to make s a palindrome is:
- Change s[2] from 'c' to 'd', resulting in "abddba"
This is a palindrome with exactly 1 operation.

Input: s = "aa"
Output: true
Explanation: s is already a palindrome (0 operations needed, which is <= 2).

Input: s = "abcdef"
Output: false
Explanation: It is impossible to make s a palindrome with at most 2 operations.
```

## Approach

Use a two-pointer technique to compare characters from both ends of the string moving inward. Count how many positions have mismatched characters.

For the string to be convertible to a palindrome with at most 2 operations:
- If mismatches <= 2, return true
- Otherwise, return false

Each mismatch requires one operation to fix (change one of the two characters to match the other).

## C# Solution

```csharp
public class Solution
{
    public bool MakePalindrome(string s)
    {
        int mismatches = 0;
        int left = 0;
        int right = s.Length - 1;
        
        while (left < right)
        {
            if (s[left] != s[right])
            {
                mismatches++;
            }
            
            left++;
            right--;
        }
        
        return mismatches <= 2;
    }
}
```

## Complexity

- **Time:** O(n) where n is the length of the string
- **Space:** O(1)
