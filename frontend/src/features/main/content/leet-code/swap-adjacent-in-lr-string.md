# 777. Swap Adjacent in LR String

**Difficulty:** Medium
**Category:** Two Pointers, String

## Problem

Given two strings `start` and `end` consisting of `L`, `R`, and `X`, where you may swap `"XL"` to `"LX"` (an `L` can move left) or `"RX"` to `"XR"` (an `R` can move right) any number of times, return `true` if `start` can be transformed into `end`.

### Example

```
Input: start = "RXXLRXRXL", end = "XRLXXRRLX"
Output: true
```

## Approach

Since `X`s can be freely absorbed, removing all `X`s from both strings must yield the same sequence of `L`/`R` characters, and each corresponding `L`/`R` in `start` must map to the same one in `end`. Additionally, because `L` can only shift left, its index in `start` must be `>=` its index in `end`; because `R` can only shift right, its index in `start` must be `<=` its index in `end`. Use two pointers to skip over `X`s in both strings simultaneously, verifying these constraints at each aligned non-`X` character.

## C# Solution

```csharp
public class Solution
{
    public bool CanTransform(string start, string end)
    {
        if (start.Length != end.Length) return false;

        int n = start.Length;
        int i = 0, j = 0;

        while (i < n && j < n)
        {
            while (i < n && start[i] == 'X') i++;
            while (j < n && end[j] == 'X') j++;

            if (i == n || j == n) return i == n && j == n;

            if (start[i] != end[j]) return false;

            if (start[i] == 'L' && i < j) return false;
            if (start[i] == 'R' && i > j) return false;

            i++;
            j++;
        }

        return true;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra.
