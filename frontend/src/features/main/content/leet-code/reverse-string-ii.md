# 541. Reverse String II

**Difficulty:** Easy
**Category:** Two Pointers, String

## Problem

Given a string `s` and an integer `k`, reverse the first `k` characters for every `2k` characters counting from the start of the string. If fewer than `k` characters remain in a block, reverse all of them; if between `k` and `2k` characters remain, reverse only the first `k`.

### Example

```
Input: s = "abcdefg", k = 2
Output: "bacdfeg"
```

### Constraints

- `1 <= s.length <= 10^4`
- `1 <= k <= 10^4`

## Approach

Iterate through the string in fixed strides of `2k`, and for each block, reverse only its first `k` characters (or fewer, if the block is shorter) using a standard two-pointer in-place swap on a mutable character array.

## C# Solution

```csharp
public class Solution
{
    public string ReverseStr(string s, int k)
    {
        var chars = s.ToCharArray();

        for (int start = 0; start < chars.Length; start += 2 * k)
        {
            int left = start;
            int right = Math.Min(start + k, chars.Length) - 1;

            while (left < right)
            {
                (chars[left], chars[right]) = (chars[right], chars[left]);
                left++;
                right--;
            }
        }

        return new string(chars);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the character array.
