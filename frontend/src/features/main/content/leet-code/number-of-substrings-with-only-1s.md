# 1513. Number of Substrings With Only 1s

**Difficulty:** Medium
**Category:** Math, String

## Problem

Given a binary string `s`, return the number of substrings that consist only of `1`'s, modulo `10^9 + 7`.

### Example

```
Input: s = "0110111"
Output: 9
```

## Approach

Scan the string and track the length of the current run of consecutive `1`'s. A run of length `k` contributes `k * (k + 1) / 2` substrings made entirely of `1`'s (one for every start/end pair within the run). Sum this over all runs, taking the result modulo `10^9 + 7`.

## C# Solution

```csharp
public class Solution
{
    public int NumSub(string s)
    {
        const int Mod = 1_000_000_007;
        long total = 0;
        long run = 0;

        foreach (char c in s)
        {
            if (c == '1')
            {
                run++;
                total = (total + run) % Mod;
            }
            else
            {
                run = 0;
            }
        }

        return (int)total;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the string.
- **Space:** `O(1)`.
