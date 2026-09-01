# 858. Mirror Reflection

**Difficulty:** Medium
**Category:** Math, Geometry, Number Theory

## Problem

A square room has mirrors on all four walls except receptors at three corners, numbered `0`, `1`, and `2` (the fourth corner, where the laser starts, has no receptor). Given `p` (the room's side length) and `q` (the height at which the laser first hits the right wall), return which receptor the laser eventually reaches.

### Example

```
Input: p = 2, q = 1
Output: 2
```

## Approach

Reduce `p` and `q` by their greatest common divisor — the laser's reflection pattern only depends on their ratio. After reduction, the parity of the reduced `p` and `q` fully determines the answer: if the reduced `p` is even, the laser reaches receptor `2`; otherwise if the reduced `q` is even, it reaches receptor `0`; otherwise (both odd) it reaches receptor `1`.

## C# Solution

```csharp
public class Solution
{
    public int MirrorReflection(int p, int q)
    {
        int gcd = Gcd(p, q);
        p /= gcd;
        q /= gcd;

        if (p % 2 == 0) return 2;
        if (q % 2 == 0) return 0;
        return 1;
    }

    private int Gcd(int a, int b)
    {
        return b == 0 ? a : Gcd(b, a % b);
    }
}
```

## Complexity

- **Time:** `O(log(min(p, q)))`.
- **Space:** `O(1)`.
