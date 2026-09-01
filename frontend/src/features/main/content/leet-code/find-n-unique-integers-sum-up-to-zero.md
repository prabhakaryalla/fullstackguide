# 1304. Find N Unique Integers Sum up to Zero

**Difficulty:** Easy
**Category:** Array, Math

## Problem

Given an integer `n`, return any array of `n` unique integers such that they add up to `0`.

### Example

```
Input: n = 5
Output: [-2,-1,0,1,2]
```

## Approach

Pair up positive and negative values: for `i` from `1` to `n/2`, add both `i` and `-i` to the result — their sum is always `0` and all values are distinct. If `n` is odd, also include `0` to fill the remaining slot without breaking the balance.

## C# Solution

```csharp
public class Solution
{
    public int[] SumZero(int n)
    {
        var result = new int[n];
        int idx = 0;

        for (int i = 1; i <= n / 2; i++)
        {
            result[idx++] = i;
            result[idx++] = -i;
        }

        if (n % 2 == 1) result[idx] = 0;

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the output array.
