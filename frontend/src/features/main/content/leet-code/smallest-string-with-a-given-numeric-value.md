# 1663. Smallest String With A Given Numeric Value

**Difficulty:** Medium
**Category:** Math, String, Greedy

## Problem

The "numeric value" of a lowercase letter is its position in the alphabet (`a` = 1, ..., `z` = 26), and a string's numeric value is the sum of its letters' values. Given `n` and `k`, return the lexicographically smallest string of length `n` whose numeric value equals `k`.

### Example

```
Input: n = 3, k = 27
Output: "aay"
```

## Approach

To be lexicographically smallest, earlier characters should be as small as possible, meaning any "extra" value beyond the baseline (`n` for all `'a'`s) should be pushed as far right as possible, maxing out trailing characters at `'z'` before moving left. Starting from all `'a'`s (value `n`), distribute the remaining `k - n` from the rightmost position leftward, capping each position's addition at `25` (to stay within `'z'`).

## C# Solution

```csharp
public class Solution
{
    public string GetSmallestString(int n, int k)
    {
        char[] result = new char[n];
        Array.Fill(result, 'a');
        int remaining = k - n;
        int i = n - 1;

        while (remaining > 0)
        {
            int add = Math.Min(remaining, 25);
            result[i] = (char)('a' + add);
            remaining -= add;
            i--;
        }

        return new string(result);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the output.
