# 1869. Longer Contiguous Segments of Ones than Zeros

**Difficulty:** Easy
**Category:** String

## Problem

Given a binary string `s`, return whether the longest contiguous segment of `'1'`s is strictly longer than the longest contiguous segment of `'0'`s.

### Example

```
Input: s = "1101"
Output: true
```

## Approach

Scan through the string tracking the length of the current run of identical characters; whenever the run ends (the next character differs, or the string ends), update the best-seen run length for whichever character (`'0'` or `'1'`) that run consisted of. Compare the two bests at the end.

## C# Solution

```csharp
public class Solution
{
    public bool CheckZeroOnes(string s)
    {
        int maxOnes = 0, maxZeros = 0;
        int current = 1;

        for (int i = 1; i <= s.Length; i++)
        {
            if (i < s.Length && s[i] == s[i - 1])
            {
                current++;
            }
            else
            {
                if (s[i - 1] == '1') maxOnes = Math.Max(maxOnes, current);
                else maxZeros = Math.Max(maxZeros, current);
                current = 1;
            }
        }

        return maxOnes > maxZeros;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
