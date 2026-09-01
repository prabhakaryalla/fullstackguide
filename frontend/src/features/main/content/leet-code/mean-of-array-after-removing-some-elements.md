# 1619. Mean of Array After Removing Some Elements

**Difficulty:** Easy
**Category:** Array, Sorting

## Problem

Given an integer array `arr`, remove the smallest 5% and largest 5% of elements, then return the mean of the remaining elements. Answers within `10^-5` of the actual answer are accepted.

### Example

```
Input: arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
Output: 10.5
```

## Approach

Sort the array, compute `trim = n / 20` (5% of the length, since `n` is guaranteed a multiple of 20), and average the elements strictly between index `trim` and `n - trim`.

## C# Solution

```csharp
public class Solution
{
    public double TrimMean(int[] arr)
    {
        Array.Sort(arr);
        int n = arr.Length;
        int trim = n / 20;
        long sum = 0;

        for (int i = trim; i < n - trim; i++)
        {
            sum += arr[i];
        }

        return (double)sum / (n - 2 * trim);
    }
}
```

## Complexity

- **Time:** `O(n log n)` for sorting.
- **Space:** `O(log n)` for the sort.
