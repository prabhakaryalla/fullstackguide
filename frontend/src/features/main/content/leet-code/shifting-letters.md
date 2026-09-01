# 848. Shifting Letters

**Difficulty:** Medium
**Category:** Array, String, Prefix Sum

## Problem

Given a string `s` and an array `shifts` of the same length, shift letter `s[i]` forward in the alphabet (wrapping `z` to `a`) by the sum of `shifts[i], shifts[i+1], ..., shifts[n-1]`. Return the resulting string.

### Example

```
Input: s = "abc", shifts = [3,5,9]
Output: "rpl"
```

## Approach

Each character's total shift is a suffix sum of the `shifts` array. Compute the total sum of all shifts first (the shift applied to the first character), then walk left to right, applying the current running suffix sum (modulo 26) to each character, and subtract that position's own shift value from the running total before moving to the next character (removing it from the suffix sum needed for later positions).

## C# Solution

```csharp
public class Solution
{
    public string ShiftingLetters(string s, int[] shifts)
    {
        int n = s.Length;
        long totalShift = 0;
        foreach (var shift in shifts) totalShift += shift;
        totalShift %= 26;

        var result = new char[n];

        for (int i = 0; i < n; i++)
        {
            int shiftAmount = (int)(totalShift % 26);
            result[i] = (char)('a' + (s[i] - 'a' + shiftAmount) % 26);

            totalShift -= shifts[i];
            totalShift = ((totalShift % 26) + 26) % 26;
        }

        return new string(result);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the result array.
