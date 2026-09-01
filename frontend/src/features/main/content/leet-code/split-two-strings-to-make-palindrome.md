# 1616. Split Two Strings to Make Palindrome

**Difficulty:** Medium
**Category:** Two Pointers, String, Greedy

## Problem

Given two strings `a` and `b` of the same length, you may split both at the same index `i` into `aprefix + asuffix` and `bprefix + bsuffix`. Return whether `aprefix + bsuffix` or `bprefix + asuffix` can form a palindrome for some split index.

### Example

```
Input: a = "x", b = "y"
Output: true
```

## Approach

For a candidate concatenation `aprefix + bsuffix`, walk pointers inward from both ends of the combined length matching `a[left]` against `b[right]` while they agree — this covers the prefix/suffix boundary implicitly. Once the pointers stop agreeing (or cross), the remaining middle segment must itself be a palindrome in either `a` or `b` for the split to work. Check both orderings (`a` prefix with `b` suffix, and vice versa).

## C# Solution

```csharp
public class Solution
{
    public bool CheckPalindromeFormation(string a, string b)
    {
        return CheckConcat(a, b) || CheckConcat(b, a);
    }

    private bool CheckConcat(string a, string b)
    {
        int left = 0;
        int right = a.Length - 1;

        while (left < right && a[left] == b[right])
        {
            left++;
            right--;
        }

        return IsPalindrome(a, left, right) || IsPalindrome(b, left, right);
    }

    private bool IsPalindrome(string s, int left, int right)
    {
        while (left < right)
        {
            if (s[left] != s[right])
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

- **Time:** `O(n)`.
- **Space:** `O(1)`.
