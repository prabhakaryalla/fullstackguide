# 3498. Reverse Degree of a String

**Difficulty:** Easy
**Category:** String, Math

## Problem

Given a string `s` consisting of lowercase English letters, the **reverse degree** of `s` is computed as follows: for each character at 1-indexed position `i`, its letter value is `26` for `'a'`, `25` for `'b'`, ..., down to `1` for `'z'` (i.e. `26 - (s[i] - 'a')`). Multiply that letter value by its position `i`, and sum the products over the whole string.

Return the reverse degree of `s`.

### Example

```
Input: s = "abc"
Output: 148
Explanation:
- 'a' at position 1: value 26 -> 26 * 1 = 26
- 'b' at position 2: value 25 -> 25 * 2 = 50
- 'c' at position 3: value 24 -> 24 * 3 = 72
Total: 26 + 50 + 72 = 148
```

## Approach

Iterate through the string once, maintaining a 1-indexed position counter. For each character compute its reverse letter value `26 - (s[i] - 'a')`, multiply it by the (1-indexed) position, and accumulate the sum in a `long` to avoid overflow before casting to `int`.

## C# Solution

```csharp
public class Solution 
{
    public int ReverseDegree(string s) 
    {
        long sum = 0;
        for (int i = 0; i < s.Length; i++)
        {
            int letterValue = 26 - (s[i] - 'a');
            sum += (long)letterValue * (i + 1);
        }
        return (int)sum;
    }
}
```

## Complexity

- **Time:** O(n), where n is the length of `s`.
- **Space:** O(1).
