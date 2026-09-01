# 9. Palindrome Number

**Difficulty:** Easy
**Category:** Math

## Problem

Given an integer `x`, return `true` if `x` is a palindrome integer.

An integer is a palindrome when it reads the same forward and backward.

### Example 1

```
Input: x = 121
Output: true
```

### Example 2

```
Input: x = -123
Output: false
Explanation: From left to right, it reads -123. From right to left, it becomes 321-. Not a palindrome.
```

### Example 3

```
Input: x = 10
Output: false
```

### Constraints

- `-2^31 <= x <= 2^31 - 1`

Follow-up: Could you solve it without converting the integer to a string?

## Approach

Negative numbers and numbers ending in `0` (except `0` itself) can never be palindromes. Otherwise, reverse only the second half of the number and compare it to the remaining first half — this avoids overflow entirely and touches half as many digits as reversing the whole number.

## C# Solution

```csharp
public class Solution
{
    public bool IsPalindrome(int x)
    {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;

        int reverted = 0;
        while (x > reverted)
        {
            reverted = reverted * 10 + x % 10;
            x /= 10;
        }

        return x == reverted || x == reverted / 10;
    }
}
```

## Complexity

- **Time:** `O(log10(x))` — only half the digits are visited.
- **Space:** `O(1)`.
