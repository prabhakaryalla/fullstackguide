# 248. Strobogrammatic Number III

**Difficulty:** Hard
**Category:** Array, Recursion, String

## Problem

Given two strings `low` and `high` representing two integers, return the count of strobogrammatic numbers in the inclusive range `[low, high]`.

### Example

```
Input: low = "50", high = "100"
Output: 3
```

### Constraints

- `1 <= low.length, high.length <= 15`
- `low` and `high` consist of only digits without leading zeros, and represent integers in the range `[1, 10^15 - 1]`.
- `low <= high`.

## Approach

For every length between `low.length` and `high.length`, generate all strobogrammatic numbers of that length using the same build-from-the-middle-outward recursion as Strobogrammatic Number II, skipping leading zeros. For each generated string, compare it (as an equal-length numeric string) against `low` and `high` to decide whether it falls within range, and count it if so.

## C# Solution

```csharp
public class Solution
{
    public int StrobogrammaticInRange(string low, string high)
    {
        int count = 0;
        for (int len = low.Length; len <= high.Length; len++)
        {
            foreach (var candidate in Build(len, len))
            {
                if (candidate.Length > 1 && candidate[0] == '0') continue;
                if (candidate.Length == low.Length && string.CompareOrdinal(candidate, low) < 0) continue;
                if (candidate.Length == high.Length && string.CompareOrdinal(candidate, high) > 0) continue;
                count++;
            }
        }

        return count;
    }

    private List<string> Build(int m, int n)
    {
        if (m == 0) return new List<string> { "" };
        if (m == 1) return new List<string> { "0", "1", "8" };

        var inner = Build(m - 2, n);
        var result = new List<string>();

        foreach (var mid in inner)
        {
            if (m != n) result.Add("0" + mid + "0");
            result.Add("1" + mid + "1");
            result.Add("6" + mid + "9");
            result.Add("8" + mid + "8");
            result.Add("9" + mid + "6");
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(5^(L/2))` per length `L`, summed over all lengths between `low.length` and `high.length`.
- **Space:** `O(5^(L/2))` — for storing generated candidates at each length.
