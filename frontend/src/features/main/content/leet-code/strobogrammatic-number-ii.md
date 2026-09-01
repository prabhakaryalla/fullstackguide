# 247. Strobogrammatic Number II

**Difficulty:** Medium
**Category:** Array, Recursion, String

## Problem

Given an integer `n`, return all strobogrammatic numbers of length `n` (numbers that look the same when rotated 180 degrees).

### Example

```
Input: n = 2
Output: ["11","69","88","96"]
```

### Constraints

- `1 <= n <= 14`

## Approach

Build strings recursively from the outside in: for a target length `n` and current inner length `m`, generate all valid inner strings of length `m`, then wrap each with a pair of rotation-symmetric digits (`0`/`0`, `1`/`1`, `6`/`9`, `8`/`8`, `9`/`6`) at the outermost layer. Skip leading zero pairs unless the inner string itself is the whole (non-zero-length) answer, and handle the middle character specially when `n` is odd (must be `0`, `1`, or `8`).

## C# Solution

```csharp
public class Solution
{
    public IList<string> FindStrobogrammatic(int n)
    {
        return Build(n, n);
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

- **Time:** `O(5^(n/2))` — the number of strobogrammatic strings grows exponentially with length.
- **Space:** `O(5^(n/2))` — for storing the generated results.
