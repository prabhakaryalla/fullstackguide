# 1726. Tuple with Same Product

**Difficulty:** Medium
**Category:** Array, Hash Table

## Problem

Given an array of distinct positive integers `nums`, return the number of tuples `(a, b, c, d)` such that `a * b = c * d`, where `a`, `b`, `c`, and `d` are elements of `nums`, and all four indices are pairwise distinct.

### Example

```
Input: nums = [2,3,4,6]
Output: 8
```

## Approach

For every pair `(i, j)` compute the product `nums[i] * nums[j]` and tally how many pairs share each product using a hash map. For a product shared by `c` distinct pairs, choosing any 2 of those pairs yields `C(c, 2) * 8` valid ordered tuples (the two elements within a pair can swap, and the two pairs can swap which is first).

## C# Solution

```csharp
public class Solution
{
    public int TupleSameProduct(int[] nums)
    {
        var productCount = new Dictionary<int, int>();
        int n = nums.Length;

        for (int i = 0; i < n; i++)
        {
            for (int j = i + 1; j < n; j++)
            {
                int product = nums[i] * nums[j];
                productCount[product] = productCount.GetValueOrDefault(product, 0) + 1;
            }
        }

        long result = 0;
        foreach (int c in productCount.Values)
            result += (long)c * (c - 1) * 4;

        return (int)result;
    }
}
```

## Complexity

- **Time:** `O(n^2)`.
- **Space:** `O(n^2)` for the product counts.
