# 3566. Partition Array into Two Equal Product Subsets

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Recursion, Enumeration

## Problem
You are given an array `nums` of distinct positive integers and an integer `target`. Determine whether `nums` can be partitioned into two non-empty disjoint subsets (covering every element) such that the product of the elements in each subset equals `target`. Return `true` if such a partition exists, otherwise `false`.

**Example 1:** `nums = [3,1,6,8,4], target = 24` → `true` (`[3,8]` and `[1,6,4]` both have product 24)
**Example 2:** `nums = [2,5,3,7], target = 15` → `false`

**Constraints:**
- `3 <= nums.length <= 12`
- `1 <= target <= 10^15`
- `1 <= nums[i] <= 100`

## Approach
Since `nums.length <= 12`, we can enumerate all `2^n` subsets via bitmask. A quick necessary condition: the product of *all* elements must equal `target * target` (since the two subsets' products both equal `target`), which lets us skip immediately if that check fails — but even without that shortcut, brute force over all subset bitmasks works fine at this size.

For each non-empty proper subset (bitmask from `1` to `2^n - 2`), compute its product; if it equals `target`, compute the product of the complementary subset and check whether that also equals `target` (this guards against overflow-induced false matches and confirms both halves multiply to `target`). Use `long` arithmetic and break out of the product computation early if it exceeds `target` to avoid overflow, since all `nums[i] >= 1`.

## C# Solution

```csharp
public class Solution {
    public bool CheckEqualPartitions(int[] nums, long target) {
        int n = nums.Length;

        for (int mask = 1; mask < (1 << n) - 1; mask++) {
            long product1 = 1;
            bool overflow1 = false;

            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) != 0) {
                    product1 *= nums[i];
                    if (product1 > target) {
                        overflow1 = true;
                        break;
                    }
                }
            }

            if (overflow1 || product1 != target) continue;

            long product2 = 1;
            bool overflow2 = false;

            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) == 0) {
                    product2 *= nums[i];
                    if (product2 > target) {
                        overflow2 = true;
                        break;
                    }
                }
            }

            if (!overflow2 && product2 == target) {
                return true;
            }
        }

        return false;
    }
}
```

## Complexity

- **Time:** O(2^n · n) — every subset bitmask is examined, and each requires O(n) work to compute both products.
- **Space:** O(1) additional space beyond the input.
