# 3022. Minimize OR of Remaining Elements Using Operations

**Difficulty:** Hard
**Category:** Array, Bit Manipulation, Greedy

## Problem

You are given a 0-indexed integer array `nums` and an integer `k`. In one operation, choose two adjacent elements and replace them with their bitwise AND, reducing the array's length by one. You may perform at most `k` such operations. Return the minimum possible bitwise OR of all remaining elements after performing at most `k` operations.

## Approach

Build the answer bit by bit, from the highest bit down, trying to keep each bit turned **off** if possible. Maintain `prefixMask`, the set of high bits we're currently attempting to clear (i.e., a target value we want every remaining element to satisfy `value & prefixMask == 0` — modeled here as checking `(runningAnd | ans) == ans`, meaning every merged group's AND only ever touches bits already conceded into `ans`).

For each candidate bit position `i` from high to low:
1. Tentatively add bit `i` to `prefixMask`.
2. Simulate a greedy left-to-right merge: keep AND-ing consecutive elements together into a running accumulator; whenever the accumulator, OR'd with the bits already conceded (`ans`), still equals `ans` (meaning this merged group doesn't leak any new high bit we're trying to keep off), "close" that merge group (reset the accumulator) — otherwise keep merging (an operation is spent) since this group still has bit `i` set.
3. Count how many merge operations that requires. If it exceeds `k`, bit `i` can't be cleared with the operation budget, so concede it: add it permanently to `ans`.

## C# Solution

```csharp
public class Solution {
    public int MinOrAfterOperations(int[] nums, int k) {
        const int maxBit = 30;
        int ans = 0;
        int prefixMask = 0;

        for (int i = maxBit; i >= 0; i--) {
            prefixMask |= 1 << i;
            if (GetMergeOps(nums, prefixMask, ans) > k)
                ans |= 1 << i;
        }

        return ans;
    }

    // Returns how many adjacent-AND merges are needed so every group's AND fits within `target`'s bits.
    private int GetMergeOps(int[] nums, int prefixMask, int target) {
        int mergeOps = 0;
        int andAcc = prefixMask;
        foreach (int num in nums) {
            andAcc &= num;
            if ((andAcc | target) == target)
                andAcc = prefixMask;
            else
                mergeOps++;
        }
        return mergeOps;
    }
}
```

## Complexity

- Time: O(30 * n) — one greedy simulation per candidate bit.
- Space: O(1).
