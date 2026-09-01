# 3095. Shortest Subarray With OR at Least K I

**Difficulty:** Easy
**Category:** Array, Bit Manipulation, Sliding Window

## Problem

Given a 0-indexed integer array `nums` and an integer `k`, return the length of the shortest subarray whose bitwise OR of all its elements is at least `k`, or `-1` if no such subarray exists.

### Example

```
Input: nums = [1,2,3], k = 2
Output: 1
Explanation: The subarray [2] alone already has OR value 2 >= k.
```

## Approach

Maintain a sliding window and, instead of recomputing OR from scratch, track how many elements currently in the window have each individual bit set (a 30-slot counter). A bit contributes to the running OR value exactly when its counter is nonzero. Expand the right edge (incrementing bit counters, adding newly-nonzero bits to the OR), and whenever the running OR meets or exceeds `k`, try shrinking from the left (decrementing counters, removing bits that hit zero) while recording the minimum valid window length.

## C# Solution

```csharp
public class Solution {
    public int MinimumSubarrayLength(int[] nums, int k) {
        const int maxBit = 30;
        int n = nums.Length;
        int ans = n + 1;
        int ors = 0;
        int[] count = new int[maxBit];

        for (int l = 0, r = 0; r < n; r++) {
            ors = OrNum(ors, nums[r], count);
            while (ors >= k && l <= r) {
                ans = Math.Min(ans, r - l + 1);
                ors = UndoOrNum(ors, nums[l], count);
                l++;
            }
        }

        return ans == n + 1 ? -1 : ans;
    }

    private int OrNum(int ors, int num, int[] count) {
        for (int i = 0; i < count.Length; i++)
            if (((num >> i) & 1) == 1 && ++count[i] == 1)
                ors += 1 << i;
        return ors;
    }

    private int UndoOrNum(int ors, int num, int[] count) {
        for (int i = 0; i < count.Length; i++)
            if (((num >> i) & 1) == 1 && --count[i] == 0)
                ors -= 1 << i;
        return ors;
    }
}
```

## Complexity

- Time: O(30 * n) — each element updates/reverts up to 30 bit counters.
- Space: O(30) — the bit counter array.
