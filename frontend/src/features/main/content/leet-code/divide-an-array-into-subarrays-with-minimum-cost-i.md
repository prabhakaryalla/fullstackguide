# 3010. Divide an Array Into Subarrays With Minimum Cost I

**Difficulty:** Easy
**Category:** Array, Sorting

## Problem

You are given a 0-indexed array `nums` of `n` integers. Split `nums` into exactly **three** disjoint contiguous subarrays. The cost of the split is the sum of the first elements of the three subarrays. Return the minimum possible cost.

### Example

```
Input: nums = [1,2,3,12]
Output: 6
Explanation: Split into [1], [2], [3,12]. Cost = 1 + 2 + 3 = 6, which is minimal.
```

## Approach

The first subarray always starts at index `0`, so `nums[0]` is always part of the cost. The other two subarrays each contribute their first element, and those starting elements can be any two of `nums[1..n-1]` (as long as the subarrays stay contiguous and non-empty, which is always achievable by picking any two distinct starting indices from that range and giving the rest of the array to whichever subarray needs padding). To minimize the total cost, pick the two **smallest** values among `nums[1..n-1]` as the starting elements of the second and third subarrays.

## C# Solution

```csharp
public class Solution {
    public int MinimumCost(int[] nums) {
        const int kMax = 50; // constraints guarantee 1 <= nums[i] <= 50
        int min1 = kMax, min2 = kMax;

        for (int i = 1; i < nums.Length; i++) {
            if (nums[i] < min1) {
                min2 = min1;
                min1 = nums[i];
            } else if (nums[i] < min2) {
                min2 = nums[i];
            }
        }

        return nums[0] + min1 + min2;
    }
}
```

## Complexity

- Time: O(n) — a single pass to find the two smallest values.
- Space: O(1).
