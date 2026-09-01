# 2419. Strictly Palindromic Number

**Difficulty:** Medium
**Category:** Math, Two Pointers, Brainteaser

## Problem

An integer `n` is strictly palindromic if, for every base `b` between 2 and `n - 2` (inclusive), the string representation of the integer `n` in base `b` is palindromic.

Given an integer `n`, return `true` if `n` is strictly palindromic and `false` otherwise.

### Example

```
Input: n = 9
Output: false
Explanation: In base 2: 9 = 1001 (palindrome)
In base 3: 9 = 100 (not palindrome)
```

## Approach

This is a trick question. For any integer `n >= 4`, in base `n-2`, the representation is always "12" (since `n = 1*(n-2) + 2`), which is not a palindrome. Therefore, no number >= 4 can be strictly palindromic. Numbers less than 4 don't have enough bases to check.

## C# Solution

```csharp
public class Solution
{
    public bool IsStrictlyPalindromic(int n)
    {
        return false;
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
