# 1131. Maximum of Absolute Value Expression

**Difficulty:** Medium
**Category:** Array, Math

## Problem

Given two arrays `arr1` and `arr2` of equal length, return the maximum value of `|arr1[i] - arr1[j]| + |arr2[i] - arr2[j]| + |i - j|` over all pairs of indices `i, j`.

### Example

```
Input: arr1 = [1,2,3,4], arr2 = [-1,4,5,6]
Output: 13
```

## Approach

Each absolute value can independently be `+` or `-` its argument, so the expression expands into one of four sign patterns: `±(arr1[i] - arr1[j]) ± (arr2[i] - arr2[j]) ± (i - j)`. For each of the four sign combinations `(s1, s2, s3)`, compute `value[k] = s1·arr1[k] + s2·arr2[k] + s3·k` for every index, and the best achievable value for that pattern is `max(value) - min(value)`. Taking the overall maximum across the four patterns gives the answer.

## C# Solution

```csharp
public class Solution
{
    public int MaxAbsValExpr(int[] arr1, int[] arr2)
    {
        int n = arr1.Length;
        int[][] signs = { new[] { 1, 1, 1 }, new[] { 1, 1, -1 }, new[] { 1, -1, 1 }, new[] { 1, -1, -1 } };
        int result = 0;

        foreach (var s in signs)
        {
            int max = int.MinValue, min = int.MaxValue;

            for (int i = 0; i < n; i++)
            {
                int value = s[0] * arr1[i] + s[1] * arr2[i] + s[2] * i;
                max = Math.Max(max, value);
                min = Math.Min(min, value);
            }

            result = Math.Max(result, max - min);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
