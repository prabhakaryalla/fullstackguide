# 1652. Defuse the Bomb

**Difficulty:** Easy
**Category:** Array

## Problem

Given a circular array `code` and a key `k`, decrypt it: if `k > 0`, replace each element with the sum of the next `k` elements (circularly); if `k < 0`, replace each with the sum of the previous `|k|` elements; if `k == 0`, replace every element with `0`.

### Example

```
Input: code = [5,7,1,4], k = 3
Output: [12,10,16,13]
```

## Approach

For each position, sum the `k` circularly-indexed neighbors in the appropriate direction, using modulo arithmetic (adjusted to stay non-negative in C#) to wrap around the array boundaries.

## C# Solution

```csharp
public class Solution
{
    public int[] Decrypt(int[] code, int k)
    {
        int n = code.Length;
        int[] result = new int[n];

        if (k == 0)
        {
            return result;
        }

        for (int i = 0; i < n; i++)
        {
            int sum = 0;

            if (k > 0)
            {
                for (int j = 1; j <= k; j++)
                {
                    sum += code[(i + j) % n];
                }
            }
            else
            {
                for (int j = 1; j <= -k; j++)
                {
                    sum += code[((i - j) % n + n) % n];
                }
            }

            result[i] = sum;
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n * |k|)`.
- **Space:** `O(n)` for the output.
