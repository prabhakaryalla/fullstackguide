# 344. Reverse String

**Difficulty:** Easy
**Category:** Two Pointers, String, Recursion

## Problem

Write a function that reverses a string. The input string is given as an array of characters `s`, and the reversal must be done in place with `O(1)` extra memory.

### Example

```
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
```

### Constraints

- `1 <= s.length <= 10^5`
- `s[i]` is a printable ASCII character.

## Approach

Use two pointers starting at both ends of the array, swapping the characters at each pointer and moving them toward the center until they meet.

## C# Solution

```csharp
public class Solution
{
    public void ReverseString(char[] s)
    {
        int left = 0, right = s.Length - 1;
        while (left < right)
        {
            (s[left], s[right]) = (s[right], s[left]);
            left++;
            right--;
        }
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over half the array.
- **Space:** `O(1)` — swaps happen in place.
