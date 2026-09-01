# 3041. Maximize Consecutive Elements in an Array After Modification

**Difficulty:** Medium
**Category:** Array, Dynamic Programming, Greedy, Sorting

## Problem

You are given a 0-indexed integer array `nums`. You may increase any element by at most `1` (each element can be incremented by `0` or `1`, independently). After optionally applying these increments, select a subsequence of `nums` and rearrange it (any order) so that its elements form a strictly increasing sequence of **consecutive integers** (each one exactly one more than the previous). Return the maximum possible length of such a subsequence.

### Example

```
Input: nums = [2,1,5,1,1]
Output: 3
Explanation: Increment one of the 1's to 2 and the other stays. Select {1, 2, 2->? } - concretely,
selecting elements that become 1, 2, 3-consecutive-style values ({1,1->2,... }) yields a consecutive
run of length 3 after increments.
```

## Approach

Sort `nums`. For each distinct value `num`, after sorting, track two running quantities as we scan left to right:

- `dp0`: the length of the longest consecutive run ending exactly at `num` (using original values, no increment applied to the last element).
- `dp1`: the length of the longest consecutive run ending at `num + 1`, where the last element used its "+1" increment to reach `num + 1`.

Update rules while scanning sorted values, comparing the current `num` to the previous distinct value `prev`:

- If `num == prev` (a duplicate): the duplicate can extend the run ending at `prev` by using its own `+1` increment, giving a new/better `dp1 = dp0 + 1`.
- If `num == prev + 1` (next consecutive integer): both `dp0` and `dp1` extend naturally by one.
- If `num == prev + 2`: the run ending at `prev + 1` (`dp1`) can be extended by `num` (`dp0 = dp1 + 1`), while a fresh run starts at `num + 1` (`dp1 = 1`).
- Otherwise (a gap larger than 2): both runs restart fresh at `num` and `num + 1`.

Track the maximum of `dp0`/`dp1` seen throughout the scan.

## C# Solution

```csharp
public class Solution {
    public int MaxSelectedElements(int[] nums) {
        Array.Sort(nums);
        int ans = 1;
        int prev = int.MinValue;
        int dp0 = 1; // longest run ending at `prev` (no increment used on it)
        int dp1 = 1; // longest run ending at `prev + 1` (increment used on it)

        foreach (int num in nums) {
            if (num == prev) {
                dp1 = dp0 + 1;
            } else if (num == prev + 1) {
                dp0++;
                dp1++;
            } else if (num == prev + 2) {
                dp0 = dp1 + 1;
                dp1 = 1;
            } else {
                dp0 = 1;
                dp1 = 1;
            }
            ans = Math.Max(ans, Math.Max(dp0, dp1));
            prev = num;
        }

        return ans;
    }
}
```

## Complexity

- Time: O(n log n) — dominated by sorting.
- Space: O(1) — excluding the sort's own workspace.
