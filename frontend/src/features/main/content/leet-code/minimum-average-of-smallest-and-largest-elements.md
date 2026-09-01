# 3194. Minimum Average of Smallest and Largest Elements

**Difficulty:** Easy
**Category:** Array, Sorting

## Problem
Given an integer array of even length, repeatedly remove the smallest and largest remaining elements and compute their average, until the array is empty. Return the minimum average computed across all these operations.

## Approach
Sort the array. Then use two pointers, one starting at the beginning (smallest) and one at the end (largest), moving them toward each other, computing the average of each matched pair. Track the minimum average found across all pairs; since values are sorted, the smallest averages tend to occur early, but computing all pairs and taking the minimum guarantees correctness regardless.

## C# Solution
```csharp
public class Solution {
    public double MinimumAverage(int[] nums) {
        double ans = double.MaxValue;
        Array.Sort(nums);

        int i = 0;
        int j = nums.Length - 1;
        while (i < j) {
            ans = Math.Min(ans, (nums[i] + nums[j]) / 2.0);
            i++;
            j--;
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n log n)
- Space: O(1) extra (ignoring sort's internal space)
