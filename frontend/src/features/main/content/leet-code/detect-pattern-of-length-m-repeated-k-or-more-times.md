# 1566. Detect Pattern of Length M Repeated K or More Times

**Difficulty:** Easy
**Category:** Array

## Problem

Given an array `arr` and integers `m` and `k`, return `true` if there exists a contiguous pattern of length `m` that is immediately repeated `k` or more times consecutively within `arr`.

### Example

```
Input: arr = [1,2,4,4,4,4], m = 1, k = 3
Output: true
```

## Approach

For every possible starting index of a pattern, check whether the `k` consecutive blocks of length `m` starting there all match each other, which is equivalent to checking that `arr[i] == arr[i - m]` continues to hold for `m * (k - 1)` positions after the first block. Track a running counter of how many consecutive positions satisfy this match condition; once the counter reaches `m * (k - 1)`, a valid repeated pattern has been found.

## C# Solution

```csharp
public class Solution
{
    public bool ContainsPattern(int[] arr, int m, int k)
    {
        int n = arr.Length;
        int required = m * (k - 1);
        int matchStreak = 0;

        for (int i = m; i < n; i++)
        {
            if (arr[i] == arr[i - m])
            {
                matchStreak++;
                if (matchStreak >= required)
                {
                    return true;
                }
            }
            else
            {
                matchStreak = 0;
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** `O(n)` — a single pass over the array.
- **Space:** `O(1)`.
