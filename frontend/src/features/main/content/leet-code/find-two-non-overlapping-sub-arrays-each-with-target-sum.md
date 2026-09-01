# 1477. Find Two Non-overlapping Sub-arrays Each With Target Sum

**Difficulty:** Medium
**Category:** Array, Binary Search, Dynamic Programming, Sliding Window

## Problem

Given an array `arr` of positive integers and an integer `target`, find two non-overlapping, non-empty subarrays, each summing to `target`, minimizing the sum of their lengths. Return that minimum sum, or `-1` if no such pair exists.

### Example

```
Input: arr = [3,2,2,4,3], target = 3
Output: 2
```

## Approach

Use a sliding window (two pointers) to find every subarray summing to `target`, since all values are positive. While scanning, maintain `minLen[i]`, the shortest valid subarray found so far with its right end at or before index `i`. Whenever a new window `[left, right]` sums to `target`, check `minLen[left - 1]` (the best subarray fully before this window); if one exists, it combines with the current window's length as a candidate answer. Update `minLen[right]` after processing each position.

## C# Solution

```csharp
public class Solution
{
    public int MinSumOfLengths(int[] arr, int target)
    {
        int n = arr.Length;
        var minLen = new int[n];
        Array.Fill(minLen, int.MaxValue);

        int left = 0, sum = 0, best = int.MaxValue;

        for (int right = 0; right < n; right++)
        {
            sum += arr[right];
            while (sum > target)
            {
                sum -= arr[left];
                left++;
            }

            if (sum == target)
            {
                int length = right - left + 1;
                int prevMin = left > 0 ? minLen[left - 1] : int.MaxValue;
                if (prevMin != int.MaxValue) best = Math.Min(best, prevMin + length);

                minLen[right] = Math.Min(right > 0 ? minLen[right - 1] : int.MaxValue, length);
            }
            else
            {
                minLen[right] = right > 0 ? minLen[right - 1] : int.MaxValue;
            }
        }

        return best == int.MaxValue ? -1 : best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(n)` for the `minLen` array.
