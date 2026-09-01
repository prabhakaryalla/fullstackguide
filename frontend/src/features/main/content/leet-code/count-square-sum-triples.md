# 1925. Count Square Sum Triples

**Difficulty:** Easy
**Category:** Math, Enumeration

## Problem

Given an integer `n`, return the number of square triples `(a, b, c)` such that `1 <= a, b, c <= n` and `a^2 + b^2 == c^2`. Triples are counted as ordered (i.e., `(3,4,5)` and `(4,3,5)` are both counted).

### Example

```
Input: n = 5
Output: 2
Explanation: (3,4,5) and (4,3,5) both satisfy 3^2 + 4^2 = 5^2.
```

### Constraints

- `1 <= n <= 250`

## Approach

Since `n` is small, brute-force enumerate all pairs `(a, b)` in `[1, n] x [1, n]`, compute `c = sqrt(a^2 + b^2)`, and check whether `c` is an integer within `[1, n]` (i.e., `c * c == a^2 + b^2`). Count every valid ordered pair.

## C# Solution

```csharp
public class Solution
{
    public int CountTriples(int n)
    {
        int count = 0;

        for (int a = 1; a <= n; a++)
        {
            for (int b = 1; b <= n; b++)
            {
                int sumSquares = a * a + b * b;
                int c = (int)Math.Sqrt(sumSquares);
                if (c <= n && c * c == sumSquares)
                {
                    count++;
                }
            }
        }

        return count;
    }
}
```

## Complexity

- **Time:** `O(n^2)` — checking every pair `(a, b)`.
- **Space:** `O(1)`.
