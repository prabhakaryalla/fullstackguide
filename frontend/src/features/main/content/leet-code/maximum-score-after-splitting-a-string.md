# 1422. Maximum Score After Splitting a String

**Difficulty:** Easy
**Category:** String

## Problem

Given a binary string `s`, split it into a non-empty left substring and a non-empty right substring. The score is the number of `'0'`s in the left substring plus the number of `'1'`s in the right substring. Return the maximum achievable score.

### Example

```
Input: s = "011101"
Output: 5
```

## Approach

Precompute the total count of `'1'` characters. Scan possible split points from left to right (excluding the very last character, since the right part must be non-empty), maintaining a running count of zeros seen so far on the left and ones remaining on the right, updating the best score at each split point.

## C# Solution

```csharp
public class Solution
{
    public int MaxScore(string s)
    {
        int onesRight = 0;
        foreach (var c in s) if (c == '1') onesRight++;

        int zerosLeft = 0;
        int best = int.MinValue;

        for (int i = 0; i < s.Length - 1; i++)
        {
            if (s[i] == '0') zerosLeft++;
            else onesRight--;

            best = Math.Max(best, zerosLeft + onesRight);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
