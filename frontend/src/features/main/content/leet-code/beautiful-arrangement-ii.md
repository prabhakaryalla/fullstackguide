# 667. Beautiful Arrangement II

**Difficulty:** Medium
**Category:** Array, Math

## Problem

Given two integers `n` and `k`, construct an array of `n` distinct positive integers from `1` to `n` such that the array of absolute differences between consecutive elements has exactly `k` distinct values.

### Example

```
Input: n = 3, k = 2
Output: [1,3,2]
```

### Constraints

- `1 <= k < n <= 10^4`

## Approach

Generate exactly `k` distinct differences by alternating between the smallest and largest remaining unused values: starting from `1` and `k+1`, alternately take from the low end (incrementing) and the high end (decrementing), which produces differences `k, k-1, k-2, ..., 1` in sequence. After exhausting this alternating zig-zag for `k+1` values, append the remaining values `k+2` through `n` in plain ascending order, each contributing a difference of exactly `1` (already counted), keeping the total distinct difference count at `k`.

## C# Solution

```csharp
public class Solution
{
    public int[] ConstructArray(int n, int k)
    {
        var result = new int[n];
        int left = 1, right = k + 1;
        int index = 0;

        for (int i = 0; i <= k; i++)
        {
            if (i % 2 == 0)
                result[index++] = left++;
            else
                result[index++] = right--;
        }

        for (int i = k + 2; i <= n; i++)
            result[index++] = i;

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the result array.
