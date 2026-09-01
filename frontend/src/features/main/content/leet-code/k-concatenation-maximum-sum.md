# 1191. K-Concatenation Maximum Sum

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Divide and Conquer

## Problem

Given an integer array `arr` and an integer `k`, form a new array by concatenating `arr` to itself `k` times. Return the maximum possible sum of a (non-empty) contiguous subarray of that new array, modulo `10^9 + 7`.

### Example

```
Input: arr = [1,-2,1], k = 5
Output: 2
```

## Approach

Rather than building the huge concatenated array, reason about it structurally. The best subarray sum within a *single* copy of `arr` is found via Kadane's algorithm. If `k > 1`, a subarray can also span across copies: it would take a maximal suffix of one copy, pass through `(k - 2)` full copies (only worth including if the total sum of `arr` is positive), and end with a maximal prefix of another copy. Comparing the single-copy Kadane result against this cross-copy combination (when `k > 1`) gives the overall answer.

## C# Solution

```csharp
public class Solution
{
    public int KConcatenationMaxSum(int[] arr, int k)
    {
        const int MOD = 1_000_000_007;
        long totalSum = arr.Sum();
        long maxKadane = MaxSubarraySum(arr);

        long prefixMax = 0, sum = 0;
        foreach (int num in arr)
        {
            sum += num;
            prefixMax = Math.Max(prefixMax, sum);
        }

        long suffixMax = 0;
        sum = 0;
        for (int i = arr.Length - 1; i >= 0; i--)
        {
            sum += arr[i];
            suffixMax = Math.Max(suffixMax, sum);
        }

        long result = maxKadane;

        if (k > 1)
        {
            long combined = prefixMax + suffixMax + (totalSum > 0 ? (k - 2) * totalSum : 0);
            result = Math.Max(result, combined);
        }

        return (int)(Math.Max(result, 0) % MOD);
    }

    private long MaxSubarraySum(int[] arr)
    {
        long best = arr[0], current = arr[0];
        for (int i = 1; i < arr.Length; i++)
        {
            current = Math.Max(arr[i], current + arr[i]);
            best = Math.Max(best, current);
        }
        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
