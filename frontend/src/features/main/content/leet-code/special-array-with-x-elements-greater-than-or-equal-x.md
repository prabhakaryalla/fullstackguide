# 1608. Special Array With X Elements Greater Than or Equal X

**Difficulty:** Easy
**Category:** Array, Binary Search, Sorting

## Problem

An array `nums` is "special" if there exists a number `x` such that exactly `x` elements of `nums` are greater than or equal to `x`. Return `x` if it exists (it is guaranteed to be unique if it exists), otherwise `-1`.

### Example

```
Input: nums = [3,5]
Output: 2
Explanation: There are 2 values (3 and 5) that are greater than or equal to 2.
```

## Approach

Sort the array in descending order. For each candidate `x` from `0` to `n`, exactly `x` elements are `>=` some threshold precisely when `x` values from the front of the descending array are `>= x` and (if `x < n`) the next element is `< x`. Check each candidate `x` in `[0, n]` directly against the sorted array using a count comparison.

## C# Solution

```csharp
public class Solution
{
    public int SpecialArray(int[] nums)
    {
        Array.Sort(nums);
        int n = nums.Length;

        for (int x = 1; x <= n; x++)
        {
            int count = 0;
            foreach (int num in nums)
            {
                if (num >= x)
                {
                    count++;
                }
            }

            if (count == x)
            {
                return x;
            }
        }

        return -1;
    }
}
```

## Complexity

- **Time:** `O(n^2)` in the worst case (or `O(n log n)` with binary search per candidate).
- **Space:** `O(log n)` for the sort.
