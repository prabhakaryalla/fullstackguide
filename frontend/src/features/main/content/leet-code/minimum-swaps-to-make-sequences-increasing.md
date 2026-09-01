# 801. Minimum Swaps To Make Sequences Increasing

**Difficulty:** Medium
**Category:** Array, Dynamic Programming

## Problem

Given two integer arrays `nums1` and `nums2` of the same length, you may swap `nums1[i]` and `nums2[i]` for any index `i`. Return the minimum number of swaps needed so that both arrays become strictly increasing.

### Example

```
Input: nums1 = [1,3,5,4], nums2 = [1,2,3,7]
Output: 1
```

## Approach

Track two rolling states while scanning left to right: `keep`, the minimum swaps needed so far assuming index `i` is *not* swapped, and `swap`, the minimum swaps needed assuming index `i` *is* swapped. At each step, check which of the two ways to keep both sequences increasing up to this point remain valid (no-swap-to-no-swap, or swap-to-swap, requires `nums1[i] > nums1[i-1]` and `nums2[i] > nums2[i-1]`; the crossed combination requires `nums1[i] > nums2[i-1]` and `nums2[i] > nums1[i-1]`), and update the new `keep`/`swap` values accordingly, taking the minimum over any valid transition. The final answer is the minimum of the two final states.

## C# Solution

```csharp
public class Solution
{
    public int MinSwap(int[] nums1, int[] nums2)
    {
        int n = nums1.Length;
        int keep = 0, swap = 1;

        for (int i = 1; i < n; i++)
        {
            int newKeep = int.MaxValue, newSwap = int.MaxValue;

            if (nums1[i] > nums1[i - 1] && nums2[i] > nums2[i - 1])
            {
                newKeep = Math.Min(newKeep, keep);
                newSwap = Math.Min(newSwap, swap + 1);
            }

            if (nums1[i] > nums2[i - 1] && nums2[i] > nums1[i - 1])
            {
                newKeep = Math.Min(newKeep, swap);
                newSwap = Math.Min(newSwap, keep + 1);
            }

            keep = newKeep;
            swap = newSwap;
        }

        return Math.Min(keep, swap);
    }
}
```

## Complexity

- **Time:** `O(n)`.
- **Space:** `O(1)` extra.
