# 1529. Minimum Suffix Flips

**Difficulty:** Medium
**Category:** Array, String, Greedy, Bit Manipulation

## Problem

Given a binary string `target`, starting from a string of all zeros of the same length, each operation flips every bit from some chosen index to the end of the string (a suffix flip). Return the minimum number of operations required to make the string equal to `target`.

### Example

```
Input: target = "10111"
Output: 3
```

## Approach

Scan `target` left to right while tracking the current "effective" bit value after all flips applied so far (starting at `'0'`). Whenever the target's bit at the current position differs from the current effective value, that means a new suffix flip must start here — increment the operation count and toggle the effective value.

## C# Solution

```csharp
public class Solution
{
    public int MinFlips(string target)
    {
        int operations = 0;
        char current = '0';

        foreach (char c in target)
        {
            if (c != current)
            {
                operations++;
                current = c;
            }
        }

        return operations;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the string.
- **Space:** `O(1)`.
