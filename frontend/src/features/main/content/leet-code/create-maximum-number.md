# 321. Create Maximum Number

**Difficulty:** Hard
**Category:** Stack, Greedy, Array, Monotonic Stack

## Problem

Given two integer arrays `nums1` and `nums2` representing digits of two numbers, and an integer `k`, create the maximum number of length `k` by choosing digits (preserving relative order) from `nums1` and `nums2`, merging them arbitrarily. Return an array of the `k` digits representing the answer.

### Example

```
Input: nums1 = [3,4,6,5], nums2 = [9,1,2,5,8,3], k = 5
Output: [9,8,6,5,3]
```

### Constraints

- `m == nums1.length`
- `n == nums2.length`
- `1 <= m, n <= 500`
- `0 <= nums1[i], nums2[i] <= 9`
- `1 <= k <= m + n`

## Approach

For every valid split `i` (digits taken from `nums1`) and `k - i` (from `nums2`), compute the maximum subsequence of each array of that length using a greedy monotonic stack, then merge the two subsequences greedily (always taking from whichever remaining suffix is lexicographically larger) to form the best candidate. Keep the largest candidate across all splits.

## C# Solution

```csharp
public class Solution
{
    public int[] MaxNumber(int[] nums1, int[] nums2, int k)
    {
        int n = nums1.Length, m = nums2.Length;
        int[] best = new int[k];
        bool first = true;

        for (int i = Math.Max(0, k - m); i <= Math.Min(k, n); i++)
        {
            var candidate = Merge(MaxSubsequence(nums1, i), MaxSubsequence(nums2, k - i));
            if (first || Greater(candidate, 0, best, 0))
            {
                best = candidate;
                first = false;
            }
        }

        return best;
    }

    private int[] MaxSubsequence(int[] nums, int k)
    {
        var stack = new int[k];
        int top = -1;
        int remaining = nums.Length - k;

        foreach (var num in nums)
        {
            while (top >= 0 && stack[top] < num && remaining > 0)
            {
                top--;
                remaining--;
            }

            if (top + 1 < k)
                stack[++top] = num;
            else
                remaining--;
        }

        return stack;
    }

    private int[] Merge(int[] a, int[] b)
    {
        var result = new int[a.Length + b.Length];
        int i = 0, j = 0, r = 0;

        while (i < a.Length || j < b.Length)
        {
            if (Greater(a, i, b, j))
                result[r++] = a[i++];
            else
                result[r++] = b[j++];
        }

        return result;
    }

    private bool Greater(int[] a, int i, int[] b, int j)
    {
        while (i < a.Length && j < b.Length && a[i] == b[j])
        {
            i++;
            j++;
        }

        return j == b.Length || (i < a.Length && a[i] > b[j]);
    }
}
```

## Complexity

- **Time:** `O(k * (m + n)^2)` — trying up to `k` splits, each involving an `O(m + n)` merge with comparisons.
- **Space:** `O(m + n)` per candidate.
