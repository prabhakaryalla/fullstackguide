# 3424. Minimum Cost to Make Arrays Identical

**Difficulty:** Medium
**Category:** Array, Greedy, Sorting

## Problem
You are given two integer arrays `arr` and `brr` of the same length `n`, and an integer `k`. You want to make `arr` identical to `brr`. You may use the following operations any number of times:

1. Increase or decrease any element of `arr` by 1, at a cost of 1 per unit changed.
2. Rearrange all elements of `arr` into any order, at a one-time cost of `k` (regardless of how many swaps that requires).

Return the minimum total cost to make `arr` equal to `brr`.

## Approach
There are only two meaningful strategies:

1. **Never rearrange:** the cost is simply `sum(|arr[i] - brr[i]|)` for the arrays in their original order.
2. **Rearrange once, then adjust:** pay `k` to freely reorder `arr`, then optimally pair its values with `brr`'s values to minimize the total absolute difference. By the rearrangement inequality, sorting both arrays and pairing them index-by-index minimizes the sum of absolute differences among all possible pairings.

The answer is the minimum of these two costs — rearranging is only worth it when the savings in adjustment cost exceed `k`.

## C# Solution

```csharp
public class Solution 
{
    public long MinCost(int[] arr, int[] brr, long k) 
    {
        int n = arr.Length;

        long costWithoutRearrange = 0;
        for (int i = 0; i < n; i++) 
        {
            costWithoutRearrange += Math.Abs((long)arr[i] - brr[i]);
        }

        int[] sortedArr = (int[])arr.Clone();
        int[] sortedBrr = (int[])brr.Clone();
        Array.Sort(sortedArr);
        Array.Sort(sortedBrr);

        long costWithRearrange = k;
        for (int i = 0; i < n; i++) 
        {
            costWithRearrange += Math.Abs((long)sortedArr[i] - sortedBrr[i]);
        }

        return Math.Min(costWithoutRearrange, costWithRearrange);
    }
}
```

## Complexity

- **Time:** O(n log n), dominated by sorting the two arrays
- **Space:** O(n) for the sorted copies
