# 3583. Count Special Triplets

**Difficulty:** Medium
**Category:** Array, Hash Table, Counting

## Problem
You are given an integer array `nums`. A special triplet is a set of indices `(i, j, k)` such that `0 <= i < j < k < n` and `nums[i] == nums[j] * 2` and `nums[k] == nums[j] * 2`. Return the total number of special triplets, modulo `10^9 + 7`.

**Example 1:** `nums = [6,3,6]` → `1`
**Example 3:** `nums = [8,4,2,8,4]` → `2`

## Approach
Treat `j` as the pivot of the triplet: for a fixed `j`, we need to count how many indices `i < j` satisfy `nums[i] == 2 * nums[j]`, and how many indices `k > j` satisfy `nums[k] == 2 * nums[j]`. The number of valid triplets with this `j` as the middle index is the product of those two counts.

Precompute a suffix frequency map `freqAfter` that, at the start, contains the count of every value appearing at any index (built once), then as we scan `j` from left to right maintain:
- `freqBefore`: frequency map of `nums[0..j-1]`.
- `freqAfter`: frequency map of `nums[j+1..n-1]` (decrement as `j` advances past each index).

At each `j`, look up `freqBefore[2 * nums[j]]` and `freqAfter[2 * nums[j]]`, multiply them, and add to a running total (careful with the edge case `nums[j] == 0`, which is handled naturally since `2 * 0 == 0`). Update `freqBefore` by adding `nums[j]` after processing it, and initialize `freqAfter` by removing `nums[j]` before processing the next index.

## C# Solution

```csharp
public class Solution {
    public int SpecialTriplets(int[] nums) {
        const int MOD = 1_000_000_007;
        int n = nums.Length;

        var freqAfter = new Dictionary<int, long>();
        foreach (int v in nums) freqAfter[v] = freqAfter.GetValueOrDefault(v, 0) + 1;

        var freqBefore = new Dictionary<int, long>();
        long total = 0;

        for (int j = 0; j < n; j++) {
            // remove nums[j] from freqAfter since it should represent nums[j+1..n-1]
            freqAfter[nums[j]]--;

            long target = 2L * nums[j];
            if (target <= int.MaxValue) {
                int targetInt = (int)target;
                long before = freqBefore.GetValueOrDefault(targetInt, 0);
                long after = freqAfter.GetValueOrDefault(targetInt, 0);
                total = (total + before * after) % MOD;
            }

            freqBefore[nums[j]] = freqBefore.GetValueOrDefault(nums[j], 0) + 1;
        }

        return (int)total;
    }
}
```

## Complexity

- **Time:** O(n) — a single pass maintaining prefix and suffix frequency maps.
- **Space:** O(n) for the two frequency dictionaries.
