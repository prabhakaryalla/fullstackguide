# 2809. Pass the Pillow

**Difficulty:** Easy
**Category:** Math, Simulation

## Problem

There are `n` people standing in a line labeled from `1` to `n`. Initially, the first person holds a pillow. Every second, the person holding the pillow passes it to the next person standing in the line. Once the pillow reaches the end of the line, the direction changes, and people continue passing the pillow back toward the beginning.

Given two positive integers `n` and `time`, return the index of the person holding the pillow after `time` seconds.

### Example

```
Input: n = 4, time = 5
Output: 2
Explanation:
Second 1: Pass from 1 to 2
Second 2: Pass from 2 to 3
Second 3: Pass from 3 to 4
Second 4: Pass from 4 to 3
Second 5: Pass from 3 to 2
```

## Approach

The pillow moves back and forth in a pattern. Key observations:

1. A full cycle (1 to n and back to 1) takes `2(n-1)` seconds
2. Use modular arithmetic to find position within the current cycle
3. Determine if we're moving forward or backward based on the position in the cycle

## C# Solution

```csharp
public class Solution
{
    public int PassThePillow(int n, int time)
    {
        int cycleLength = 2 * (n - 1);
        int position = time % cycleLength;
        
        if (position < n)
        {
            return position + 1;
        }
        else
        {
            return 2 * n - position - 1;
        }
    }
}
```

## Complexity

- **Time:** O(1)
- **Space:** O(1)
