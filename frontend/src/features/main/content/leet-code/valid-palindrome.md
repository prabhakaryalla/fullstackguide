# 125. Valid Palindrome

**Difficulty:** Easy
**Category:** Two Pointers, String

## Problem

Given a string `s`, return `true` if it is a palindrome after converting all uppercase letters to lowercase and removing all non-alphanumeric characters.

### Example 1

```
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: after cleanup, "amanaplanacanalpanama" reads the same forward and backward.
```

### Example 2

```
Input: s = "race a car"
Output: false
```

### Constraints

- `1 <= s.length <= 2 * 10^5`
- `s` consists only of printable ASCII characters.

## Approach

Use two pointers starting at both ends of the string, skipping over any character that isn't a letter or digit. Compare the lowercase form of the two current characters; if they ever differ, the string isn't a palindrome. Continue until the pointers meet.

## C# Solution

```csharp
public class Solution
{
    public bool IsPalindrome(string s)
    {
        int left = 0, right = s.Length - 1;

        while (left < right)
        {
            while (left < right && !char.IsLetterOrDigit(s[left])) left++;
            while (left < right && !char.IsLetterOrDigit(s[right])) right--;

            if (char.ToLowerInvariant(s[left]) != char.ToLowerInvariant(s[right]))
            {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)` — each character is visited a constant number of times.
- **Space:** `O(1)`.
