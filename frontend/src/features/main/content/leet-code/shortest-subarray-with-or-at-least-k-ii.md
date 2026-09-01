# 3097. Shortest Subarray With OR at Least K II

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Sliding Window

## Problem

This is the harder-constraints version of [Shortest Subarray With OR at Least K I](shortest-subarray-with-or-at-least-k-i.md): given a 0-indexed integer array `nums` (with larger values, up to about `2^30`) and an integer `k`, return the length of the shortest subarray whose bitwise OR is at least `k`, or `-1` if none exists.

## Approach

The size/value increase doesn't change the underlying algorithm — the same O(n) sliding window with per-bit counters (tracking how many elements in the window have each of the 30 bits set) already scales to these constraints, since maintaining the running OR only costs O(30) work per element added or removed.

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
