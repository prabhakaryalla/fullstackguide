# 3634. Minimum Removals to Balance Array

**Difficulty:** Medium
**Category:** Array, Binary Search, Sorting, Sliding Window, Two Pointers

## Problem
You are given an integer array `nums` and an integer `k`. An array is balanced if its maximum element is at most `k` times its minimum element. You may remove any number of elements from `nums` without making it empty.

Return the minimum number of elements to remove so that the remaining array is balanced. An array of size 1 is always considered balanced.

### Example
Input: `nums = [1,6,2,9], k = 3`
Output: `2`
Explanation: Removing `nums[0] = 1` and `nums[3] = 9` leaves `[6, 2]`; `max = 6`, `min = 2`, and `6 <= 2 * 3`, so it is balanced.

Constraints:
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `1 <= k <= 10^5`

## Approach
Sort the array. Since a balanced subsequence's elements, once sorted, must satisfy `max <= k * min`, the largest balanced subset is always a contiguous window in the sorted order. Use two pointers: for each left boundary `i` (the minimum of the window), advance the right boundary `j` while `nums[j] <= nums[i] * k`. Track the longest such window; the answer is `n` minus the longest window length.

## C# Solution

```csharp
public class Solution {
    public int MinRemoval(int[] nums, int k) {
        Array.Sort(nums);
        int n = nums.Length;
        int best = 1;
        int i = 0;

        for (int j = 0; j < n; j++) {
            while ((long)nums[j] > (long)nums[i] * k) {
                i++;
            }
            best = Math.Max(best, j - i + 1);
        }

        return n - best;
    }
}
```

## Complexity

- **Time:** O(n log n)
- **Space:** O(1) extra space (aside from sorting)
