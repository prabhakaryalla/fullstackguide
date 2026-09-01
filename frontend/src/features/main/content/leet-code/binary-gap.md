# 868. Binary Gap

**Difficulty:** Easy
**Category:** Bit Manipulation

## Problem

Given a positive integer `n`, return the maximum distance between two consecutive `1`s in its binary representation, or `0` if there are fewer than two `1`s.

### Example

```
Input: n = 22
Output: 2
```

## Approach

Scan through the bits of `n` from least significant to most significant, tracking the position of the most recently seen `1` bit. Whenever a new `1` bit is found, compute its distance from the previous one and update the maximum gap.

## C# Solution

```csharp
public class Solution
{
    public int BinaryGap(int n)
    {
        int lastPos = -1;
        int maxGap = 0;
        int pos = 0;

        while (n > 0)
        {
            if ((n & 1) == 1)
            {
                if (lastPos != -1)
                    maxGap = Math.Max(maxGap, pos - lastPos);

                lastPos = pos;
            }

            n >>= 1;
            pos++;
        }

        return maxGap;
    }
}
```

## Complexity

- **Time:** `O(log n)`.
- **Space:** `O(1)`.
