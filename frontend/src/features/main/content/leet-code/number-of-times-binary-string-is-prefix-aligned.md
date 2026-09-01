# 1375. Number of Times Binary String Is Prefix-Aligned

**Difficulty:** Medium
**Category:** Array

## Problem

Given a permutation `flips` describing the order in which bits of an all-zero binary string of length `n` are set to `1`, return how many times, after a flip, the string's prefix (from the start up to the highest index flipped so far) is entirely `1`s.

### Example

```
Input: flips = [3,2,4,1,5]
Output: 2
```

## Approach

Track the maximum index flipped so far. After each flip, the prefix up to that maximum is fully set to `1` exactly when the number of flips performed so far equals that maximum (1-indexed) — meaning every position from `1` to the maximum has been touched with no gaps.

## C# Solution

```csharp
public class Solution
{
    public int NumTimesAllBlue(int[] flips)
    {
        int maxIndex = 0, count = 0;

        for (int i = 0; i < flips.Length; i++)
        {
            maxIndex = Math.Max(maxIndex, flips[i]);
            if (maxIndex == i + 1) count++;
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
