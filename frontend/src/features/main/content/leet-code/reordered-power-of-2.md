# 869. Reordered Power of 2

**Difficulty:** Medium
**Category:** Math, Sorting, Counting, Enumeration

## Problem

Given a positive integer `n`, return `true` if the digits of `n` can be reordered (with no leading zero in the result) to form a power of 2.

### Example

```
Input: n = 1
Output: true
```

## Approach

Two numbers can be rearranged into each other exactly when they have the same multiset of digits, which can be checked by comparing their digits sorted into a canonical order. Compute the sorted-digit signature of `n`, then compare it against the sorted-digit signature of every power of 2 up to the maximum possible 32-bit value; a match means `n`'s digits can be reordered into that power of 2.

## C# Solution

```csharp
public class Solution
{
    public bool ReorderedPowerOf2(int n)
    {
        var target = GetSortedDigits(n);

        for (int power = 0; power < 31; power++)
        {
            if (GetSortedDigits(1 << power) == target)
                return true;
        }

        return false;
    }

    private string GetSortedDigits(int num)
    {
        var digits = num.ToString().ToCharArray();
        Array.Sort(digits);
        return new string(digits);
    }
}
```

## Complexity

- **Time:** `O(1)` — bounded by 31 fixed powers of 2 with at most 10 digits each.
- **Space:** `O(1)` extra.
