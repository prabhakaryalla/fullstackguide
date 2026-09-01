# 3171. Find Subarray With Bitwise OR Closest to K

**Difficulty:** Hard
**Category:** Array, Binary Search, Bit Manipulation, Segment Tree

## Problem
Given an integer array `nums` and an integer `k`, find the subarray whose bitwise OR of all its elements is closest to `k` (i.e., minimizes the absolute difference from `k`). Return that minimum absolute difference.

## Approach
Bitwise OR is monotonically non-decreasing as more elements are included, meaning as a subarray grows, its combined OR value only stays the same or increases in "set bits." Iterate through the array while maintaining a set of all possible OR values for subarrays ending at the current index. For each new number, extend every value from the previous set by OR-ing with the current number, then insert the current number itself as a length-1 subarray. Because ORing values only introduces a bounded number of new distinct values (at most `log(max value) + 1` per step, due to the growing set-bit property), the size of this rolling set stays small. Track the minimum absolute difference between any encountered OR value and `k`.

## C# Solution
```csharp
public class Solution {
    public int MinimumDifference(int[] nums, int k) {
        int ans = int.MaxValue;
        HashSet<int> prev = new HashSet<int>();

        foreach (int num in nums) {
            HashSet<int> next = new HashSet<int> { num };
            foreach (int val in prev)
                next.Add(val | num);
            foreach (int val in next)
                ans = Math.Min(ans, Math.Abs(k - val));
            prev = next;
        }

        return ans;
    }
}
```

## Complexity
- Time: O(n log(max(nums)))
- Space: O(log(max(nums)))
