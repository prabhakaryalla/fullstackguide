# 2090. K Radius Subarray Averages

**Difficulty:** Medium
**Category:** Array, Sliding Window

## Problem

Given a 0-indexed integer array `nums` and an integer `k`, the **k-radius average** of index `i` is the integer average of all elements in the window `nums[i-k..i+k]` (inclusive), or `-1` if that window would extend beyond the array's bounds. Return an array `avgs` of the k-radius average for every index.

## Approach

Use a sliding window of fixed size `2k + 1`. Maintain a running sum as the window slides one position at a time: add the newly included element and subtract the one that fell out of the window. For indices where the window would go out of bounds (`i < k` or `i >= n - k`), the answer is `-1`. Otherwise, the average is `sum / (2k + 1)` using integer division.

## C# Solution

```csharp
public class Solution
{
    public int[] GetAverages(int[] nums, int k)
    {
        int n = nums.Length;
        var result = new int[n];
        Array.Fill(result, -1);

        int windowSize = 2 * k + 1;
        if (windowSize > n) return result;

        long sum = 0;
        for (int i = 0; i < windowSize; i++)
            sum += nums[i];

        result[k] = (int)(sum / windowSize);

        for (int i = windowSize; i < n; i++)
        {
            sum += nums[i] - nums[i - windowSize];
            result[i - k] = (int)(sum / windowSize);
        }

        return result;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the result array.
