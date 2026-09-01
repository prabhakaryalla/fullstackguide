# 668. Kth Smallest Number in Multiplication Table

**Difficulty:** Hard
**Category:** Binary Search

## Problem

Given an `m x n` multiplication table (where cell `(i, j)` holds `i * j`, 1-indexed), return the `k`th smallest number in the table.

### Example

```
Input: m = 3, n = 3, k = 5
Output: 3
```

### Constraints

- `1 <= m, n <= 3 * 10^4`
- `1 <= k <= m * n`

## Approach

Binary search on the *value* rather than a position in the table. For a candidate value, count how many cells in the table are `<= that value` in `O(m)` time: for each row `i`, the count of multiples of `i` that are `<= value` and within column bounds is `min(value / i, n)`. Narrow the binary search range until it converges to the smallest value whose count reaches at least `k`.

## C# Solution

```csharp
public class Solution
{
    public int FindKthNumber(int m, int n, int k)
    {
        int left = 1, right = m * n;

        while (left < right)
        {
            int mid = left + (right - left) / 2;

            if (CountLessOrEqual(mid, m, n) < k)
                left = mid + 1;
            else
                right = mid;
        }

        return left;
    }

    private int CountLessOrEqual(int value, int m, int n)
    {
        int count = 0;
        for (int row = 1; row <= m; row++)
            count += Math.Min(value / row, n);

        return count;
    }
}
```

## Complexity

- **Time:** `O(m log(m * n))`.
- **Space:** `O(1)`.
