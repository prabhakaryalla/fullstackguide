# 978. Longest Turbulent Subarray

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given an integer array `arr`, return the length of the longest *turbulent* subarray — one where the comparison sign between consecutive elements strictly alternates (`>`, `<`, `>`, `<`, ...).

### Example

```
Input: arr = [9,4,2,10,7,8,8,1,9]
Output: 5
```

## Approach

Track two running lengths as you scan: `up` (length of the turbulent run ending here where the last comparison was an increase) and `down` (ending here where the last comparison was a decrease). Each step, an increase resets `up` to `down + 1` and `down` to `1`; a decrease does the mirror; equal values reset both to `1`. Track the maximum of `up`/`down` seen.

## C# Solution

```csharp
public class Solution
{
    public int MaxTurbulenceSize(int[] arr)
    {
        int n = arr.Length;
        int up = 1, down = 1, maxLen = 1;

        for (int i = 1; i < n; i++)
        {
            if (arr[i] > arr[i - 1]) { up = down + 1; down = 1; }
            else if (arr[i] < arr[i - 1]) { down = up + 1; up = 1; }
            else { up = 1; down = 1; }

            maxLen = Math.Max(maxLen, Math.Max(up, down));
        }

        return maxLen;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
