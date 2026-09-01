# 2012. Sum of Beauty in the Array

**Difficulty:** Medium
**Category:** Array

## Problem

Given a 0-indexed integer array `nums`, for every index `i` (`1 <= i <= nums.Length - 2`), the beauty of `nums[i]` is:

- `2`, if `nums[i]` is strictly greater than every element to its left and strictly smaller than every element to its right.
- `1`, if `nums[i]` is not covered by the case above, but `nums[i - 1] < nums[i] < nums[i + 1]`.
- `0`, otherwise.

Return *the sum of beauty of all `nums[i]`* where `1 <= i <= nums.Length - 2`.

## Approach

Precompute a prefix-maximum array (`prefixMax[i]` = max of `nums[0..i]`) and a suffix-minimum array (`suffixMin[i]` = min of `nums[i..n-1]`). For each candidate index `i`, first test the global condition `nums[i] > prefixMax[i - 1] && nums[i] < suffixMin[i + 1]` for a beauty of `2`; otherwise fall back to the local condition `nums[i - 1] < nums[i] < nums[i + 1]` for a beauty of `1`.

## C# Solution

```csharp
public class Solution
{
    public int SumOfBeauties(int[] nums)
    {
        int n = nums.Length;
        var prefixMax = new int[n];
        var suffixMin = new int[n];

        prefixMax[0] = nums[0];
        for (int i = 1; i < n; i++)
            prefixMax[i] = Math.Max(prefixMax[i - 1], nums[i]);

        suffixMin[n - 1] = nums[n - 1];
        for (int i = n - 2; i >= 0; i--)
            suffixMin[i] = Math.Min(suffixMin[i + 1], nums[i]);

        int sum = 0;
        for (int i = 1; i < n - 1; i++)
        {
            if (nums[i] > prefixMax[i - 1] && nums[i] < suffixMin[i + 1])
                sum += 2;
            else if (nums[i] > nums[i - 1] && nums[i] < nums[i + 1])
                sum += 1;
        }

        return sum;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the prefix/suffix arrays.
