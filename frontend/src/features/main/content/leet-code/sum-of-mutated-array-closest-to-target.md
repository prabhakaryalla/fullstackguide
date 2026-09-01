# 1300. Sum of Mutated Array Closest to Target

**Difficulty:** Medium
**Category:** Array, Binary Search, Sorting

## Problem

Given an integer array `arr` and an integer `target`, find an integer `value` such that replacing every element greater than `value` with `value` itself makes the array's sum as close as possible to `target`. If multiple values achieve the same minimal distance, return the smallest such value.

### Example

```
Input: arr = [4,9,3], target = 10
Output: 3
```

## Approach

As `value` increases, the "mutated sum" (`sum of min(arr[i], value)`) increases monotonically, which makes binary search viable. Search for the smallest `value` whose mutated sum is `>= target`. Since the true optimum could be that value or one less than it (the sum jumps from just below `target` to at or above it right around there), compute the mutated sum at both `value` and `value - 1` and return whichever is closer to `target`, preferring the smaller value on a tie.

## C# Solution

```csharp
public class Solution
{
    public int FindBestValue(int[] arr, int target)
    {
        int lo = 0, hi = arr.Max();

        while (lo < hi)
        {
            int mid = lo + (hi - lo) / 2;
            if (ComputeSum(arr, mid) < target) lo = mid + 1;
            else hi = mid;
        }

        int sumAtLo = ComputeSum(arr, lo);
        int sumAtLoMinusOne = ComputeSum(arr, lo - 1);

        return Math.Abs(sumAtLoMinusOne - target) <= Math.Abs(sumAtLo - target) ? lo - 1 : lo;
    }

    private int ComputeSum(int[] arr, int value)
    {
        int sum = 0;
        foreach (int num in arr)
            sum += Math.Min(num, value);
        return sum;
    }
}
```

## Complexity

- **Time:** `O(n log(maxValue))`, where `n` is the length of `arr`.
- **Space:** `O(1)`.
