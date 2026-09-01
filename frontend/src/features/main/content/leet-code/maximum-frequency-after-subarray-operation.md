# 3434. Maximum Frequency After Subarray Operation

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

You are given an integer array `nums` and an integer `k`. You must choose exactly one (possibly single-element) subarray of `nums` and add `1` to every element within it. Return the maximum possible frequency of the value `k` in the resulting array.

### Example

`nums = [1,2,2,3,1,2]`, `k = 2`

Choosing the subarray covering the two `1`s wouldn't help since they aren't adjacent in a useful way with the `2`s, but choosing the subarray `[1,2,2]` (index 0..2, i.e. `nums[0]=1` becomes `2`) turns `1` into `2` while keeping the two existing `2`s (index 1,2) unaffected since they leave the window... The optimal choice turns as many `1`s into `2`s as possible without turning too many existing `2`s into `3`s, maximizing the final frequency of `2`.

## Approach

Let `baseCount` be the number of elements already equal to `k`. Any element equal to `k-1` that falls inside the chosen subarray becomes `k` (a gain of `+1` to the frequency), while any element equal to `k` inside the subarray becomes `k+1` (a loss of `-1`). All other elements are unaffected.

Assign a weight to each element: `+1` if it equals `k-1`, `-1` if it equals `k`, and `0` otherwise. The best subarray to choose is the one maximizing the sum of these weights — a classic **maximum subarray sum** (Kadane's algorithm), allowing the gain to be `0` if no positive-weight subarray exists. The answer is `baseCount + maxGain`.

## C# Solution

```csharp
public class Solution 
{
    public int MaxFrequency(int[] nums, int k) 
    {
        int baseCount = 0;
        foreach (int num in nums) 
        {
            if (num == k) 
            {
                baseCount++;
            }
        }

        int maxGain = 0;
        int currentGain = 0;
        foreach (int num in nums) 
        {
            int weight;
            if (num == k - 1) 
            {
                weight = 1;
            } 
            else if (num == k) 
            {
                weight = -1;
            } 
            else 
            {
                weight = 0;
            }

            currentGain = Math.Max(weight, currentGain + weight);
            maxGain = Math.Max(maxGain, currentGain);
        }

        return baseCount + maxGain;
    }
}
```

## Complexity

- **Time:** O(n)
- **Space:** O(1)
