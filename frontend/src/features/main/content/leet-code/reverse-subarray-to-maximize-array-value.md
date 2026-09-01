# 1330. Reverse Subarray To Maximize Array Value

**Difficulty:** Hard
**Category:** Array, Math, Greedy

## Problem

Define the value of an array as the sum of absolute differences between all adjacent elements. Reversing at most one contiguous subarray, return the maximum value achievable.

### Example

```
Input: nums = [2,3,1,5,4]
Output: 10
```

## Approach

Reversing a subarray only changes the two boundary transitions at its edges — everything inside contributes the same set of absolute differences regardless of order. Two cases matter: reversing a subarray touching an array end only changes one boundary transition (checked directly for every possible endpoint), and reversing an internal subarray changes both boundary transitions, whose best-case gain reduces to `2 * (max_i min(a[i], a[i+1]) - min_i max(a[i], a[i+1]))`. Add the best of these gains (if positive) to the original value.

## C# Solution

```csharp
public class Solution
{
    public int MaxValueAfterReverse(int[] nums)
    {
        int n = nums.Length;
        long baseValue = 0;
        for (int i = 0; i + 1 < n; i++) baseValue += Math.Abs(nums[i + 1] - nums[i]);

        long boundaryGain = 0;
        for (int i = 0; i + 1 < n; i++)
        {
            boundaryGain = Math.Max(boundaryGain, Math.Abs(nums[0] - nums[i + 1]) - Math.Abs(nums[i] - nums[i + 1]));
            boundaryGain = Math.Max(boundaryGain, Math.Abs(nums[i] - nums[n - 1]) - Math.Abs(nums[i] - nums[i + 1]));
        }

        long mx = long.MinValue, mn = long.MaxValue;
        for (int i = 0; i + 1 < n; i++)
        {
            mx = Math.Max(mx, Math.Min(nums[i], nums[i + 1]));
            mn = Math.Min(mn, Math.Max(nums[i], nums[i + 1]));
        }
        long internalGain = Math.Max(0, 2 * (mx - mn));

        return (int)(baseValue + Math.Max(boundaryGain, internalGain));
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
