# 600. Non-negative Integers without Consecutive Ones

**Difficulty:** Hard
**Category:** Math, Dynamic Programming

## Problem

Given a positive integer `n`, return the number of integers in the range `[0, n]` whose binary representation does not contain consecutive `1`s.

### Example

```
Input: n = 5
Output: 5
Explanation: 0, 1, 2, 3(11 excluded), 4, 5 qualify — [0,1,2,4,5].
```

### Constraints

- `0 <= n <= 10^9`

## Approach

Precompute a Fibonacci-like table where `fib[i]` counts binary strings of length `i` with no two consecutive `1`s and no leading zero constraint. Scan the bits of `n` from the most significant down: whenever a `1` bit is found, add `fib[i]` (accounting for all smaller numbers achievable by putting a `0` at this position and anything valid afterward), and stop immediately if two `1` bits ever appear consecutively (since every remaining number under that prefix already contains consecutive ones from the prefix itself, meaning none of them should be double-counted further — the search terminates as `n` itself is invalid there). Add 1 at the end for `n` itself if it never had consecutive ones.

## C# Solution

```csharp
public class Solution
{
    public int FindIntegers(int n)
    {
        var fib = new int[32];
        fib[0] = 1;
        fib[1] = 2;
        for (int i = 2; i < 32; i++)
            fib[i] = fib[i - 1] + fib[i - 2];

        int count = 0;
        int prevBit = 0;
        bool hasConsecutiveOnes = false;

        for (int i = 30; i >= 0; i--)
        {
            if ((n & (1 << i)) != 0)
            {
                count += fib[i];

                if (prevBit == 1)
                {
                    hasConsecutiveOnes = true;
                    break;
                }

                prevBit = 1;
            }
            else
            {
                prevBit = 0;
            }
        }

        return count + (hasConsecutiveOnes ? 0 : 1);
    }
}
```

## Complexity

- **Time:** `O(log n)` — bounded by the fixed 32-bit width.
- **Space:** `O(1)` — a fixed-size Fibonacci table.
