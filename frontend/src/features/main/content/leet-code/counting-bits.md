# 338. Counting Bits

**Difficulty:** Easy
**Category:** Dynamic Programming, Bit Manipulation

## Problem

Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (`0 <= i <= n`), `ans[i]` is the number of `1`'s in the binary representation of `i`.

### Example

```
Input: n = 5
Output: [0,1,1,2,1,2]
```

### Constraints

- `0 <= n <= 10^5`

## Approach

Use the relation `bits(i) = bits(i >> 1) + (i & 1)`: dropping the lowest bit of `i` gives `i >> 1`, whose bit count is already computed, and adding back whether the dropped bit was `1`. Building the array from `0` upward lets each value reuse an already-computed smaller result.

## C# Solution

```csharp
public class Solution
{
    public int[] CountBits(int n)
    {
        var result = new int[n + 1];
        for (int i = 1; i <= n; i++)
            result[i] = result[i >> 1] + (i & 1);

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)` — constant work per value.
- **Space:** `O(n)` for the output array (excluding the required output).
