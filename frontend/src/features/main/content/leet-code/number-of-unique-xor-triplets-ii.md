# 3514. Number of Unique XOR Triplets II

**Difficulty:** Medium
**Category:** Array, Bit Manipulation, Hash Table, Enumeration

## Problem
You are given an integer array `nums` (`1 <= nums.length <= 1500`, `1 <= nums[i] <= 1500`, values may repeat). A XOR triplet is defined as `nums[i] XOR nums[j] XOR nums[k]` for indices `i <= j <= k` (the same index may be reused for more than one role). Return the number of **distinct** XOR triplet values obtainable across all such `(i, j, k)`.

### Example
Input: `nums = [1,3]` → Output: `2`. The achievable values are `{1, 3}` (e.g. `1^1^1=1`, `1^1^3=3`, `1^3^3=1`, `3^3^3=3`).

## Approach
Since `i <= j <= k` allows repeating indices, any three (possibly equal) values from the array can be combined, so the reachable set equals `{ a XOR b XOR c : a, b, c ∈ nums }` (with repetition allowed). Enumerating all triplets directly is `O(n^3)`, which is too slow, so split into a pair plus a single element:
1. Compute the set `pairs` of all `nums[i] XOR nums[j]` values for every pair of distinct indices `i < j` (`O(n^2)` pairs).
2. For every value `p` in `pairs` and every element `num` in `nums`, mark `p XOR num` as achievable in a boolean array (bitset).
3. The final answer is the number of `true` entries in that bitset.

Because `num` ranges over every element in `nums` (including the two indices already used in the pair), choosing `num` equal to one of the pair's own values cancels it out (`x XOR x = 0`), which is exactly what lets this approach also recover triplets that reuse an index (including the degenerate case of picking the same single value three times when `n >= 2`). The `n == 1` case is handled separately since there are no valid pairs to form.

## C# Solution

```csharp
public class Solution {
    public int UniqueXorTriplets(int[] nums) {
        int n = nums.Length;
        if (n == 1) return 1;

        var pairs = new HashSet<int>();
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                pairs.Add(nums[i] ^ nums[j]);

        int maxVal = 0;
        foreach (int x in nums) maxVal = Math.Max(maxVal, x);
        int limit = 1;
        while (limit <= maxVal) limit <<= 1;
        limit <<= 1; // safe upper bound for any XOR combination

        bool[] triplets = new bool[limit];
        foreach (int p in pairs)
            foreach (int num in nums)
                triplets[p ^ num] = true;

        int count = 0;
        foreach (bool b in triplets) if (b) count++;
        return count;
    }
}
```

## Complexity

- **Time:** O(n^2) to build the pair set and O(n^2) to combine pairs with single elements
- **Space:** O(n^2) for the pair set in the worst case, plus O(V) for the result bitset
