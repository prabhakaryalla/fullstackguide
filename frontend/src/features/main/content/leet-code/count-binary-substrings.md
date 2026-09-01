# 696. Count Binary Substrings

**Difficulty:** Easy
**Category:** String

## Problem

Given a binary string `s`, return the number of contiguous substrings that have an equal number of `0`s and `1`s, with all `0`s and all `1`s in each substring grouped consecutively.

### Example

```
Input: s = "00110011"
Output: 6
```

### Constraints

- `1 <= s.length <= 10^5`

## Approach

Scan the string, tracking the length of the current run of identical characters and the length of the immediately preceding run. Every time a run boundary is crossed, the number of valid substrings centered at that boundary equals the minimum of the previous and current run lengths — accumulate `min(previousRunLength, currentRunLength)` at each position where the current run's length no longer exceeds the previous run's.

## C# Solution

```csharp
public class Solution
{
    public int CountBinarySubstrings(string s)
    {
        int previousRunLength = 0, currentRunLength = 1, count = 0;

        for (int i = 1; i < s.Length; i++)
        {
            if (s[i] == s[i - 1])
            {
                currentRunLength++;
            }
            else
            {
                previousRunLength = currentRunLength;
                currentRunLength = 1;
            }

            if (previousRunLength >= currentRunLength)
                count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
