# 3724. Minimum Operations to Transform Array

**Difficulty:** Medium
**Category:** Array, Greedy

## Problem

You are given two integer arrays `nums1` of length `n` and `nums2` of length `n + 1`.

You want to transform `nums1` into `nums2` using the minimum number of operations. You may perform the following operations any number of times, choosing an index `i`:

- Increase `nums1[i]` by 1.
- Decrease `nums1[i]` by 1.
- Append `nums1[i]` to the end of the array.

Return the minimum number of operations required to transform `nums1` into `nums2`.

### Example

```
Input: nums1 = [2,8], nums2 = [1,7,3]
Output: 4
Explanation: Append nums1[0]=2 to the end -> [2,8,2]; decrement index 0 to 1 -> [1,8,2]; decrement index 1 to 7 -> [1,7,2]; increment index 2 to 3 -> [1,7,3]. Total operations: 4.
```

### Constraints

- `1 <= n == nums1.length <= 10^5`
- `nums2.length == n + 1`
- `1 <= nums1[i], nums2[i] <= 10^5`

## Approach

Since `nums2` has exactly one extra element, exactly one index `j` of `nums1` must be duplicated via an append. Because the append copies whatever value is currently at index `j` at the moment of the append, and each of the two resulting copies can then be independently adjusted, the total adjustment cost for handling index `j` is `1` (for the append) plus the minimum, over the value `V` chosen at append time, of `|nums1[j] - V| + |V - nums2[j]| + |V - nums2[n]|`. This sum of three absolute values is minimized when `V` is the median of `nums1[j]`, `nums2[j]`, and `nums2[n]`, giving a minimum value equal to `max(nums1[j], nums2[j], nums2[n]) - min(nums1[j], nums2[j], nums2[n])`. Every other index `i != j` simply costs `|nums1[i] - nums2[i]|`. Precompute the total cost assuming direct index-to-index matching everywhere, then for each candidate `j`, remove its direct-match cost and add the append cost instead, taking the minimum over all `j`.

## C# Solution

```csharp
public class Solution
{
    public long MinOperations(int[] nums1, int[] nums2)
    {
        int n = nums1.Length;
        long baseSum = 0;
        for (int i = 0; i < n; i++)
        {
            baseSum += Math.Abs(nums1[i] - nums2[i]);
        }

        int lastTarget = nums2[n];
        long best = long.MaxValue;

        for (int j = 0; j < n; j++)
        {
            long withoutJ = baseSum - Math.Abs(nums1[j] - nums2[j]);

            int a = nums1[j], t1 = nums2[j], t2 = lastTarget;
            int maxVal = Math.Max(a, Math.Max(t1, t2));
            int minVal = Math.Min(a, Math.Min(t1, t2));
            long range = maxVal - minVal;

            long total = withoutJ + range + 1;
            best = Math.Min(best, total);
        }

        return best;
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)`.
